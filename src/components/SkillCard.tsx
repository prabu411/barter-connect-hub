
import { Skill, User } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface SkillCardProps {
  skill: Skill;
  user: User;
  showActions?: boolean;
}

const SkillCard = ({ skill, user, showActions = true }: SkillCardProps) => {
  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{skill.title}</h3>
            <Badge className={skill.type === "offer" ? "bg-bartr-primary" : "bg-bartr-secondary"}>
              {skill.type === "offer" ? "I Offer" : "I Want"}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            {skill.category} • {skill.location}
          </div>
        </div>
        <Link to={`/profile/${user.id}`} className="flex items-center">
          <img 
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-700 text-sm">{skill.description}</p>
        <p className="text-xs font-medium text-bartr-dark mt-2">
          <span className="inline-block px-2 py-1 rounded-full bg-bartr-light">
            Available: {skill.availability}
          </span>
        </p>
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-2 border-t">
          <div className="flex justify-between items-center w-full">
            <div className="text-xs text-gray-500">
              Posted by <Link to={`/profile/${user.id}`} className="text-bartr-primary font-medium">{user.name}</Link>
            </div>
            <Button variant="outline" size="sm" className="text-bartr-primary border-bartr-primary hover:bg-bartr-light">
              Connect
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default SkillCard;
