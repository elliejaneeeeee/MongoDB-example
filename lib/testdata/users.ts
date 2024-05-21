
interface Lesson {
  [key: `lesson${number}`]: boolean
}

interface users {
  full_name: string;
  email: string;
  password: string;
  bookmarks: number;
  progress: Lesson[];
}

export const usersData: users[] = [
  {
    full_name: "Alex Johnson",
    email: "alex.johnson@example.com",
    password: "P@ssw0rd123",
    bookmarks: 12,
    progress: [
      { lesson1: true },
      { lesson2: false },
      { lesson3: true },
      { lesson4: false },
    ],
  },
  {
    full_name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    password: "M4ri@R0d!",
    bookmarks: 8,
    progress: [
      { lesson1: true },
      { lesson2: true },
      { lesson3: false },
      { lesson4: false },
    ],
  },
  {
    full_name: "David Lee",
    email: "david.lee@example.com",
    password: "Dav1dL33$",
    bookmarks: 15,
    progress: [
      { lesson1: false },
      { lesson2: true },
      { lesson3: false },
      { lesson4: true },
    ],
  },
  {
    full_name: "Sophie Brown",
    email: "sophie.brown@example.com",
    password: "S0ph!3Br0wn",
    bookmarks: 10,
    progress: [
      { lesson1: true },
      { lesson2: true },
      { lesson3: true },
      { lesson4: false },
    ],
  },
  {
    full_name: "Liam Smith",
    email: "liam.smith@example.com",
    password: "L1@msm!th",
    bookmarks: 20,
    progress: [
      { lesson1: true },
      { lesson2: false },
      { lesson3: true },
      { lesson4: true },
    ],
  },
];
