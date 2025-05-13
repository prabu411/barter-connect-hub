
import { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSkillsByUserId, Skill, User } from "@/data/mockData";
import SkillCard from "@/components/SkillCard";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<User | null>(user);
  const [skills, setSkills] = useState<Skill[]>(
    user ? getSkillsByUserId(user.id) : []
  );
  const [editMode, setEditMode] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileData) return;
    
    // In a real app, this would make an API call to update the user profile
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setEditMode(false);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <p>Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Profile Information
                  <Button 
                    variant="ghost" 
                    onClick={() => setEditMode(!editMode)}
                    className="text-bartr-primary"
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-4">
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <img 
                            src={profileData?.avatar} 
                            alt={profileData?.name} 
                            className="w-32 h-32 rounded-full object-cover border-4 border-bartr-light"
                          />
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="absolute bottom-0 right-0 rounded-full" 
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData?.name}
                          onChange={(e) => setProfileData(prev => prev ? {...prev, name: e.target.value} : null)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData?.email}
                          onChange={(e) => setProfileData(prev => prev ? {...prev, email: e.target.value} : null)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData?.location}
                          onChange={(e) => setProfileData(prev => prev ? {...prev, location: e.target.value} : null)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData?.bio}
                          onChange={(e) => setProfileData(prev => prev ? {...prev, bio: e.target.value} : null)}
                          rows={4}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-bartr-primary hover:bg-bartr-dark">
                        Save Profile
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex justify-center mb-6">
                      <img 
                        src={profileData?.avatar} 
                        alt={profileData?.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-bartr-light"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{profileData?.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profileData?.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{profileData?.location}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Bio</p>
                        <p>{profileData?.bio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="my-skills">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-skills">My Skills</TabsTrigger>
                <TabsTrigger value="add-skill">Add New Skill</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-skills" className="mt-4">
                <div className="mb-4">
                  <h2 className="font-semibold text-xl mb-2">Skills I Offer</h2>
                  {skills.filter(skill => skill.type === "offer").length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {skills
                        .filter(skill => skill.type === "offer")
                        .map(skill => (
                          <SkillCard key={skill.id} skill={skill} user={user} showActions={false} />
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">You haven't added any skills to offer yet.</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="font-semibold text-xl mb-2">Skills I Want to Learn</h2>
                  {skills.filter(skill => skill.type === "want").length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {skills
                        .filter(skill => skill.type === "want")
                        .map(skill => (
                          <SkillCard key={skill.id} skill={skill} user={user} showActions={false} />
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">You haven't added any skills you want to learn yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="add-skill" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add a New Skill</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="skill-type">Skill Type</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <Button variant="outline" className="border-2 border-bartr-primary text-bartr-primary hover:bg-bartr-light">
                              I can offer this skill
                            </Button>
                            <Button variant="outline" className="border-2 border-bartr-secondary text-bartr-secondary hover:bg-bartr-light">
                              I want to learn this
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="title">Skill Title</Label>
                          <Input id="title" placeholder="e.g. Web Development, Cooking, Guitar Lessons" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                              <option value="">Select a category</option>
                              <option value="Technology">Technology</option>
                              <option value="Art & Design">Art & Design</option>
                              <option value="Music">Music</option>
                              <option value="Cooking">Cooking</option>
                              <option value="Languages">Languages</option>
                              <option value="Fitness">Fitness</option>
                              <option value="Business">Business</option>
                              <option value="Education">Education</option>
                              <option value="DIY & Crafts">DIY & Crafts</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="City name or 'Online'" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Describe what you can teach or what you want to learn..."
                            rows={4}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="availability">Availability</Label>
                          <Input id="availability" placeholder="e.g. Weekends, Evenings, Mornings" />
                        </div>
                        
                        <Button 
                          type="button" 
                          className="w-full bg-bartr-primary hover:bg-bartr-dark"
                          onClick={() => {
                            toast({
                              title: "Skill Added",
                              description: "Your new skill has been added successfully!",
                            });
                          }}
                        >
                          Add Skill
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
