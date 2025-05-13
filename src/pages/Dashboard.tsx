
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillCard from "@/components/SkillCard";
import { findPotentialMatches, getMatchesByUserId, getSkillsByUserId, getUserById, mockSkills, User, Skill, Match } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [myMatches, setMyMatches] = useState<Array<{ match: Match; otherUser: User; mySkill: Skill; theirSkill: Skill }>>([]);
  const [potentialMatches, setPotentialMatches] = useState<Array<{user: User, offerSkill: Skill, wantSkill: Skill}>>([]);

  useEffect(() => {
    if (user) {
      const userSkills = getSkillsByUserId(user.id);
      setMySkills(userSkills);
      
      // Get my matches
      const matches = getMatchesByUserId(user.id);
      const matchesWithData = matches.map((match) => {
        const otherUserId = match.user1Id === user.id ? match.user2Id : match.user1Id;
        const otherUser = getUserById(otherUserId)!;
        
        const mySkillId = match.user1Id === user.id ? match.skill1Id : match.skill2Id;
        const theirSkillId = match.user1Id === user.id ? match.skill2Id : match.skill1Id;
        
        const mySkill = mockSkills.find(skill => skill.id === mySkillId)!;
        const theirSkill = mockSkills.find(skill => skill.id === theirSkillId)!;
        
        return { match, otherUser, mySkill, theirSkill };
      });
      setMyMatches(matchesWithData);
      
      // Get potential matches
      const potential = findPotentialMatches(user.id);
      setPotentialMatches(potential);
    }
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="container p-8 text-center">
          <p>You need to be logged in to view the dashboard.</p>
          <Link to="/login">Log in</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600">Manage your skills and connections</p>
          </div>
          <Button className="bg-bartr-primary hover:bg-bartr-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add New Skill
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="matches">
              <TabsList>
                <TabsTrigger value="matches">My Matches</TabsTrigger>
                <TabsTrigger value="potential">Potential Matches</TabsTrigger>
                <TabsTrigger value="skills">My Skills</TabsTrigger>
              </TabsList>
              
              <TabsContent value="matches" className="mt-4">
                {myMatches.length > 0 ? (
                  <div className="grid gap-4">
                    {myMatches.map(({ match, otherUser, mySkill, theirSkill }) => (
                      <Card key={match.id} className="overflow-hidden animate-fade-in">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                            <div className="flex items-center mb-4 sm:mb-0">
                              <img 
                                src={otherUser.avatar} 
                                alt={otherUser.name} 
                                className="w-12 h-12 rounded-full object-cover mr-4"
                              />
                              <div>
                                <h3 className="font-semibold">{otherUser.name}</h3>
                                <p className="text-sm text-gray-500">{otherUser.location}</p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="text-sm">
                                <span className="font-medium">They offer:</span> {theirSkill.title}
                              </span>
                              <span className="text-sm hidden sm:inline">•</span>
                              <span className="text-sm">
                                <span className="font-medium">You offer:</span> {mySkill.title}
                              </span>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-4">
                              <Button variant="outline" className="text-bartr-primary border-bartr-primary hover:bg-bartr-light" asChild>
                                <Link to={`/messages/${otherUser.id}`}>Message</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-medium">No matches yet</h3>
                    <p className="text-gray-500 mt-2">
                      Add more skills to get matched with other users.
                    </p>
                    <Button className="mt-4 bg-bartr-primary hover:bg-bartr-dark">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Skill
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="potential" className="mt-4">
                {potentialMatches.length > 0 ? (
                  <div className="grid gap-4">
                    {potentialMatches.map((match) => (
                      <Card key={`${match.user.id}-${match.offerSkill.id}`} className="overflow-hidden animate-fade-in">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                            <div className="flex items-center mb-4 sm:mb-0">
                              <img 
                                src={match.user.avatar} 
                                alt={match.user.name} 
                                className="w-12 h-12 rounded-full object-cover mr-4"
                              />
                              <div>
                                <h3 className="font-semibold">{match.user.name}</h3>
                                <p className="text-sm text-gray-500">{match.user.location}</p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="text-sm">
                                <span className="font-medium">They offer:</span> {match.offerSkill.title}
                              </span>
                              <span className="text-sm hidden sm:inline">•</span>
                              <span className="text-sm">
                                <span className="font-medium">They want:</span> {match.wantSkill.title}
                              </span>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-4">
                              <Button variant="outline" className="text-bartr-primary border-bartr-primary hover:bg-bartr-light">
                                Connect
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-medium">No potential matches found</h3>
                    <p className="text-gray-500 mt-2">
                      Add more skills to increase your chances of matching.
                    </p>
                    <Button className="mt-4 bg-bartr-primary hover:bg-bartr-dark">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Skill
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="skills" className="mt-4">
                {mySkills.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {mySkills.map((skill) => (
                      <SkillCard key={skill.id} skill={skill} user={user} showActions={false} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-medium">No skills added yet</h3>
                    <p className="text-gray-500 mt-2">
                      Add skills that you can offer or want to learn.
                    </p>
                    <Button className="mt-4 bg-bartr-primary hover:bg-bartr-dark">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Skill
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">{user.location}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-2">Bio</h3>
                  <p className="text-sm text-gray-600">{user.bio}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-2">Skills Summary</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-bartr-light rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-bartr-primary">
                        {mySkills.filter(s => s.type === "offer").length}
                      </div>
                      <div className="text-xs text-gray-600">Skills Offered</div>
                    </div>
                    <div className="bg-bartr-light rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-bartr-secondary">
                        {mySkills.filter(s => s.type === "want").length}
                      </div>
                      <div className="text-xs text-gray-600">Skills Wanted</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-2">Connections</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-bartr-light rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-bartr-primary">
                        {myMatches.filter(m => m.match.status === "accepted").length}
                      </div>
                      <div className="text-xs text-gray-600">Active</div>
                    </div>
                    <div className="bg-bartr-light rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-bartr-secondary">
                        {myMatches.filter(m => m.match.status === "pending").length}
                      </div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/profile">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
