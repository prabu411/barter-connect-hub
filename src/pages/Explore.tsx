
import { useState } from "react";
import Layout from "@/components/Layout";
import SkillCard from "@/components/SkillCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, getSkillsByType, getUserById, mockSkills } from "@/data/mockData";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const offeredSkills = getSkillsByType("offer");
  const wantedSkills = getSkillsByType("want");
  
  // Filter skills based on search term and category
  const filterSkills = (skills: typeof mockSkills) => {
    return skills.filter(skill => {
      const matchesSearch = 
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };
  
  const filteredOfferedSkills = filterSkills(offeredSkills);
  const filteredWantedSkills = filterSkills(wantedSkills);

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Skills</h1>
          <p className="text-gray-600 mb-8">Find skills to learn or people who want to learn from you</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search skills..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-bartr-primary hover:bg-bartr-dark">
              Search
            </Button>
          </div>
          
          <Tabs defaultValue="offered">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="offered">Skills Offered</TabsTrigger>
              <TabsTrigger value="wanted">Skills Wanted</TabsTrigger>
            </TabsList>
            
            <TabsContent value="offered" className="mt-4">
              {filteredOfferedSkills.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredOfferedSkills.map(skill => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      user={getUserById(skill.userId)!} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No skills found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search terms or filter.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="wanted" className="mt-4">
              {filteredWantedSkills.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredWantedSkills.map(skill => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      user={getUserById(skill.userId)!} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No skills found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search terms or filter.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
