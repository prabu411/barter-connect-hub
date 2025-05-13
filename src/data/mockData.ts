
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  bio: string;
}

export interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string; // city or "online"
  availability: string;
  type: "offer" | "want"; // offer = I offer this skill, want = I want to learn this
  userId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  skill1Id: string;  // What user1 offers
  skill2Id: string;  // What user2 offers
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export const categories = [
  "Technology",
  "Art & Design",
  "Music",
  "Cooking",
  "Languages",
  "Fitness",
  "Business",
  "Education",
  "DIY & Crafts",
  "Other"
];

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    location: "New York, NY",
    bio: "Full stack developer with a passion for teaching others about web technologies.",
  },
  {
    id: "u2",
    name: "Jamie Smith",
    email: "jamie@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    location: "San Francisco, CA",
    bio: "Professional chef looking to expand my technical skills.",
  },
  {
    id: "u3",
    name: "Taylor Williams",
    email: "taylor@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    location: "Austin, TX",
    bio: "Guitar player and music teacher with 10+ years of experience.",
  },
  {
    id: "u4",
    name: "Morgan Davis",
    email: "morgan@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    location: "Chicago, IL",
    bio: "Language enthusiast and certified Spanish teacher.",
  },
  {
    id: "u5",
    name: "Jordan Miller",
    email: "jordan@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    location: "Online",
    bio: "UX/UI designer with a background in psychology.",
  },
];

export const mockSkills: Skill[] = [
  {
    id: "s1",
    title: "Web Development",
    category: "Technology",
    description: "I can teach you HTML, CSS, JavaScript, and React fundamentals.",
    location: "Online",
    availability: "Weekends",
    type: "offer",
    userId: "u1",
    createdAt: "2023-04-15T14:30:00Z",
  },
  {
    id: "s2",
    title: "Italian Cooking",
    category: "Cooking",
    description: "Learn to make authentic Italian pasta and sauces from scratch.",
    location: "San Francisco, CA",
    availability: "Weekday evenings",
    type: "offer",
    userId: "u2",
    createdAt: "2023-04-17T09:15:00Z",
  },
  {
    id: "s3",
    title: "Guitar Lessons",
    category: "Music",
    description: "Beginner to intermediate guitar lessons, acoustic or electric.",
    location: "Austin, TX",
    availability: "Flexible",
    type: "offer",
    userId: "u3",
    createdAt: "2023-04-16T16:45:00Z",
  },
  {
    id: "s4",
    title: "Spanish Lessons",
    category: "Languages",
    description: "Conversational Spanish for beginners, focus on practical usage.",
    location: "Online",
    availability: "Mornings",
    type: "offer",
    userId: "u4",
    createdAt: "2023-04-18T11:20:00Z",
  },
  {
    id: "s5",
    title: "UI/UX Design",
    category: "Art & Design",
    description: "Learn user-centered design principles and tools like Figma.",
    location: "Online",
    availability: "Weekends",
    type: "offer",
    userId: "u5",
    createdAt: "2023-04-14T13:10:00Z",
  },
  {
    id: "s6",
    title: "Mobile App Development",
    category: "Technology",
    description: "I want to learn how to build mobile apps with React Native.",
    location: "Online",
    availability: "Weekday evenings",
    type: "want",
    userId: "u5",
    createdAt: "2023-04-18T15:30:00Z",
  },
  {
    id: "s7",
    title: "French Cooking",
    category: "Cooking",
    description: "I'd like to learn authentic French cooking techniques.",
    location: "Online",
    availability: "Weekends",
    type: "want",
    userId: "u1",
    createdAt: "2023-04-17T10:20:00Z",
  },
  {
    id: "s8",
    title: "Piano Lessons",
    category: "Music",
    description: "I want to learn piano basics and music theory.",
    location: "Chicago, IL",
    availability: "Weekday evenings",
    type: "want",
    userId: "u4",
    createdAt: "2023-04-16T14:25:00Z",
  },
  {
    id: "s9",
    title: "Digital Marketing",
    category: "Business",
    description: "I want to learn SEO and social media marketing strategies.",
    location: "San Francisco, CA",
    availability: "Flexible",
    type: "want",
    userId: "u2",
    createdAt: "2023-04-15T16:40:00Z",
  },
  {
    id: "s10",
    title: "Spanish Conversation Practice",
    category: "Languages",
    description: "Looking for a partner to practice conversational Spanish.",
    location: "Austin, TX",
    availability: "Weekends",
    type: "want",
    userId: "u3",
    createdAt: "2023-04-14T09:50:00Z",
  },
];

export const mockMatches: Match[] = [
  {
    id: "m1",
    user1Id: "u1",
    user2Id: "u2",
    skill1Id: "s1", // Alex offers Web Development
    skill2Id: "s2", // Jamie offers Italian Cooking
    status: "accepted",
    createdAt: "2023-04-19T10:00:00Z",
  },
  {
    id: "m2",
    user1Id: "u3",
    user2Id: "u4",
    skill1Id: "s3", // Taylor offers Guitar Lessons
    skill2Id: "s4", // Morgan offers Spanish Lessons
    status: "pending",
    createdAt: "2023-04-19T11:30:00Z",
  },
  {
    id: "m3",
    user1Id: "u5",
    user2Id: "u1",
    skill1Id: "s5", // Jordan offers UI/UX Design
    skill2Id: "s1", // Alex offers Web Development
    status: "accepted",
    createdAt: "2023-04-20T09:15:00Z",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg1",
    senderId: "u1",
    receiverId: "u2",
    content: "Hey Jamie! I'm interested in learning Italian cooking. Would you be available this Saturday?",
    timestamp: "2023-04-20T14:30:00Z",
    read: true,
  },
  {
    id: "msg2",
    senderId: "u2",
    receiverId: "u1",
    content: "Hi Alex! Saturday works for me. I'm free around 2 PM. Does that work for you?",
    timestamp: "2023-04-20T15:45:00Z",
    read: true,
  },
  {
    id: "msg3",
    senderId: "u1",
    receiverId: "u2",
    content: "2 PM is perfect! Looking forward to it. Should I bring anything?",
    timestamp: "2023-04-20T16:10:00Z",
    read: false,
  },
  {
    id: "msg4",
    senderId: "u5",
    receiverId: "u1",
    content: "Alex, I really enjoyed our web dev session yesterday. Thanks for the React tips!",
    timestamp: "2023-04-21T10:25:00Z",
    read: false,
  },
];

// Function to get a user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Function to get skills by user ID
export const getSkillsByUserId = (userId: string): Skill[] => {
  return mockSkills.filter(skill => skill.userId === userId);
};

// Function to get skills by type
export const getSkillsByType = (type: "offer" | "want"): Skill[] => {
  return mockSkills.filter(skill => skill.type === type);
};

// Function to get matches by user ID
export const getMatchesByUserId = (userId: string): Match[] => {
  return mockMatches.filter(match => match.user1Id === userId || match.user2Id === userId);
};

// Function to get messages between two users
export const getMessagesBetweenUsers = (user1Id: string, user2Id: string): Message[] => {
  return mockMessages.filter(
    msg => 
      (msg.senderId === user1Id && msg.receiverId === user2Id) ||
      (msg.senderId === user2Id && msg.receiverId === user1Id)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// Function to get potential matches based on complementary skills
export const findPotentialMatches = (userId: string): Array<{user: User, offerSkill: Skill, wantSkill: Skill}> => {
  const userOffers = mockSkills.filter(skill => skill.userId === userId && skill.type === "offer");
  const userWants = mockSkills.filter(skill => skill.userId === userId && skill.type === "want");
  
  const potentialMatches: Array<{user: User, offerSkill: Skill, wantSkill: Skill}> = [];
  
  // Find users who offer what the current user wants
  userWants.forEach(want => {
    const matchingOffers = mockSkills.filter(
      skill => 
        skill.type === "offer" && 
        skill.userId !== userId && 
        skill.category === want.category
    );
    
    matchingOffers.forEach(offer => {
      const matchUser = mockUsers.find(user => user.id === offer.userId);
      if (matchUser) {
        // Check if the potential match also wants something that the current user offers
        const matchUserWants = mockSkills.filter(
          skill => skill.userId === matchUser.id && skill.type === "want"
        );
        
        const complementarySkill = matchUserWants.find(matchWant => 
          userOffers.some(userOffer => userOffer.category === matchWant.category)
        );
        
        if (complementarySkill) {
          const userComplementaryOffer = userOffers.find(
            userOffer => userOffer.category === complementarySkill.category
          );
          
          if (userComplementaryOffer) {
            potentialMatches.push({
              user: matchUser,
              offerSkill: offer,
              wantSkill: complementarySkill
            });
          }
        }
      }
    });
  });
  
  return potentialMatches;
};

// Dummy current user - in a real app would come from authentication
export const currentUser = mockUsers[0]; // Alex is the current user
