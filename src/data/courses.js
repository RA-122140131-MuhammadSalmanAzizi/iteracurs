// Mock Courses Data with Multiple Content Types
export const courses = [
    {
        id: 1,
        title: 'React Fundamentals: Build Modern Web Apps',
        description: 'Master React from the ground up. Learn hooks, state management, and build real-world applications with the most popular JavaScript library.',
        instructor: 'Dr. Ahmad Lecturer',
        instructorAvatar: 'AL',
        category: 'Web Development',
        level: 'Beginner',
        duration: '12 hours',
        lessons: 45,
        students: 12543,
        rating: 4.8,
        reviews: 2341,
        price: 0,
        isFree: true,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
        tags: ['React', 'JavaScript', 'Frontend'],
        lastUpdated: '2024-01-10',
        passingScore: 80, // Minimum score to pass exercise
        chapters: [
            {
                title: 'Getting Started with React',
                contents: [
                    {
                        id: 1,
                        type: 'video',
                        title: 'Introduction to React',
                        duration: '15:00',
                        videoUrl: 'https://example.com/video1.mp4',
                        required: true
                    },
                    {
                        id: 2,
                        type: 'pdf',
                        title: 'React Cheat Sheet',
                        fileUrl: 'https://example.com/react-cheatsheet.pdf',
                        fileSize: '2.5 MB',
                        required: false
                    },
                    {
                        id: 3,
                        type: 'video',
                        title: 'Setting Up Development Environment',
                        duration: '20:00',
                        videoUrl: 'https://example.com/video2.mp4',
                        required: true
                    },
                    {
                        id: 4,
                        type: 'link',
                        title: 'Official React Documentation',
                        url: 'https://react.dev',
                        description: 'Learn more from the official docs',
                        required: false
                    },
                    {
                        id: 5,
                        type: 'video',
                        title: 'Your First React Component',
                        duration: '25:00',
                        videoUrl: 'https://example.com/video3.mp4',
                        required: true
                    },
                    {
                        id: 6,
                        type: 'exercise',
                        title: 'Chapter 1 Quiz: React Basics',
                        duration: '10 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What is React?',
                                options: [
                                    'A JavaScript library for building user interfaces',
                                    'A programming language',
                                    'A database',
                                    'An operating system'
                                ],
                                correctAnswer: 0
                            },
                            {
                                id: 2,
                                question: 'What command is used to create a new React app?',
                                options: [
                                    'npm install react',
                                    'npx create-react-app my-app',
                                    'react new my-app',
                                    'npm start react'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 3,
                                question: 'What is JSX?',
                                options: [
                                    'A new programming language',
                                    'JavaScript XML - a syntax extension for JavaScript',
                                    'A CSS framework',
                                    'A testing library'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 4,
                                question: 'Which method is used to render React content?',
                                options: [
                                    'ReactDOM.display()',
                                    'React.show()',
                                    'ReactDOM.render() or createRoot().render()',
                                    'React.mount()'
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: 5,
                                question: 'Components in React must return:',
                                options: [
                                    'A string',
                                    'A number',
                                    'JSX or null',
                                    'An object'
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                ]
            },
            {
                title: 'React Fundamentals',
                contents: [
                    {
                        id: 7,
                        type: 'video',
                        title: 'Understanding JSX',
                        duration: '18:00',
                        videoUrl: 'https://example.com/video4.mp4',
                        required: true
                    },
                    {
                        id: 8,
                        type: 'video',
                        title: 'Props and State',
                        duration: '30:00',
                        videoUrl: 'https://example.com/video5.mp4',
                        required: true
                    },
                    {
                        id: 9,
                        type: 'pdf',
                        title: 'Props vs State Comparison',
                        fileUrl: 'https://example.com/props-state.pdf',
                        fileSize: '1.2 MB',
                        required: false
                    },
                    {
                        id: 10,
                        type: 'video',
                        title: 'Event Handling',
                        duration: '22:00',
                        videoUrl: 'https://example.com/video6.mp4',
                        required: true
                    },
                    {
                        id: 11,
                        type: 'exercise',
                        title: 'Chapter 2 Quiz: Props & State',
                        duration: '15 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What are props in React?',
                                options: [
                                    'Internal component data',
                                    'Data passed from parent to child components',
                                    'CSS styles',
                                    'Event handlers'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'Can props be modified by the child component?',
                                options: [
                                    'Yes, always',
                                    'No, props are read-only',
                                    'Only in class components',
                                    'Only with special methods'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 3,
                                question: 'What hook is used for state in functional components?',
                                options: [
                                    'useEffect',
                                    'useContext',
                                    'useState',
                                    'useReducer'
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: 4,
                                question: 'How do you handle a click event in React?',
                                options: [
                                    'onclick="handleClick()"',
                                    'onClick={handleClick}',
                                    'on-click={handleClick}',
                                    'click={handleClick}'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'What happens when state changes in React?',
                                options: [
                                    'Nothing',
                                    'The page refreshes',
                                    'The component re-renders',
                                    'An error occurs'
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Advanced Concepts',
                contents: [
                    {
                        id: 12,
                        type: 'video',
                        title: 'React Hooks Deep Dive',
                        duration: '45:00',
                        videoUrl: 'https://example.com/video7.mp4',
                        required: true
                    },
                    {
                        id: 13,
                        type: 'link',
                        title: 'Hooks API Reference',
                        url: 'https://react.dev/reference/react',
                        description: 'Complete reference for all React hooks',
                        required: false
                    },
                    {
                        id: 14,
                        type: 'video',
                        title: 'Context API',
                        duration: '35:00',
                        videoUrl: 'https://example.com/video8.mp4',
                        required: true
                    },
                    {
                        id: 15,
                        type: 'pdf',
                        title: 'Context API Best Practices',
                        fileUrl: 'https://example.com/context-best-practices.pdf',
                        fileSize: '1.8 MB',
                        required: false
                    },
                    {
                        id: 16,
                        type: 'video',
                        title: 'Performance Optimization',
                        duration: '40:00',
                        videoUrl: 'https://example.com/video9.mp4',
                        required: true
                    },
                    {
                        id: 17,
                        type: 'exercise',
                        title: 'Final Exam: React Advanced',
                        duration: '20 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What is the purpose of useEffect hook?',
                                options: [
                                    'To manage state',
                                    'To perform side effects',
                                    'To create components',
                                    'To style elements'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'When does useEffect run by default?',
                                options: [
                                    'Only on mount',
                                    'Only on update',
                                    'After every render',
                                    'Never automatically'
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: 3,
                                question: 'What is the Context API used for?',
                                options: [
                                    'Styling components',
                                    'Making API calls',
                                    'Sharing data without prop drilling',
                                    'Handling forms'
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: 4,
                                question: 'Which hook memoizes expensive calculations?',
                                options: [
                                    'useCallback',
                                    'useMemo',
                                    'useRef',
                                    'useReducer'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'What is React.memo used for?',
                                options: [
                                    'Memoizing state',
                                    'Preventing unnecessary re-renders',
                                    'Creating memos',
                                    'Storing data'
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: 'Complete Python Masterclass',
        description: 'From zero to hero in Python programming. Cover everything from basics to advanced topics including data science and machine learning fundamentals.',
        instructor: 'Prof. Sarah Chen',
        instructorAvatar: 'SC',
        category: 'Programming',
        level: 'All Levels',
        duration: '28 hours',
        lessons: 120,
        students: 34521,
        rating: 4.9,
        reviews: 5621,
        price: 299000,
        isFree: false,
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
        tags: ['Python', 'Programming', 'Data Science'],
        lastUpdated: '2024-01-05',
        passingScore: 80,
        chapters: [
            {
                title: 'Python Basics',
                contents: [
                    {
                        id: 1,
                        type: 'video',
                        title: 'Introduction to Python',
                        duration: '20:00',
                        videoUrl: 'https://example.com/python1.mp4',
                        required: true
                    },
                    {
                        id: 2,
                        type: 'pdf',
                        title: 'Python Installation Guide',
                        fileUrl: 'https://example.com/python-install.pdf',
                        fileSize: '3.0 MB',
                        required: false
                    },
                    {
                        id: 3,
                        type: 'video',
                        title: 'Variables and Data Types',
                        duration: '25:00',
                        videoUrl: 'https://example.com/python2.mp4',
                        required: true
                    },
                    {
                        id: 4,
                        type: 'video',
                        title: 'Control Flow',
                        duration: '30:00',
                        videoUrl: 'https://example.com/python3.mp4',
                        required: true
                    },
                    {
                        id: 5,
                        type: 'link',
                        title: 'Python Official Documentation',
                        url: 'https://docs.python.org',
                        description: 'Official Python documentation',
                        required: false
                    },
                    {
                        id: 6,
                        type: 'exercise',
                        title: 'Python Basics Quiz',
                        duration: '15 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What is Python?',
                                options: [
                                    'A snake',
                                    'A high-level programming language',
                                    'A database',
                                    'A web browser'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'How do you print in Python?',
                                options: [
                                    'console.log()',
                                    'System.out.println()',
                                    'print()',
                                    'echo()'
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: 3,
                                question: 'Which is a valid variable name?',
                                options: [
                                    '2name',
                                    'my-var',
                                    'my_var',
                                    'class'
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: 4,
                                question: 'What is the output of type(5)?',
                                options: [
                                    '<class \'str\'>',
                                    '<class \'int\'>',
                                    '<class \'float\'>',
                                    '<class \'bool\'>'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'Which keyword is used for loops?',
                                options: [
                                    'loop',
                                    'foreach',
                                    'for',
                                    'repeat'
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Functions and OOP',
                contents: [
                    {
                        id: 7,
                        type: 'video',
                        title: 'Functions in Python',
                        duration: '35:00',
                        videoUrl: 'https://example.com/python4.mp4',
                        required: true
                    },
                    {
                        id: 8,
                        type: 'video',
                        title: 'Object-Oriented Programming',
                        duration: '45:00',
                        videoUrl: 'https://example.com/python5.mp4',
                        required: true
                    },
                    {
                        id: 9,
                        type: 'pdf',
                        title: 'OOP Cheat Sheet',
                        fileUrl: 'https://example.com/oop-cheatsheet.pdf',
                        fileSize: '1.5 MB',
                        required: false
                    },
                    {
                        id: 10,
                        type: 'exercise',
                        title: 'Functions & OOP Quiz',
                        duration: '15 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'How do you define a function in Python?',
                                options: [
                                    'function myFunc():',
                                    'def myFunc():',
                                    'fn myFunc():',
                                    'func myFunc():'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'What is self in Python classes?',
                                options: [
                                    'A reserved keyword',
                                    'Reference to the current instance',
                                    'A function',
                                    'A module'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 3,
                                question: 'What is inheritance?',
                                options: [
                                    'Creating new variables',
                                    'A class deriving from another class',
                                    'Importing modules',
                                    'Writing functions'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 4,
                                question: 'What does __init__ do?',
                                options: [
                                    'Destroys object',
                                    'Initializes object attributes',
                                    'Prints output',
                                    'Imports modules'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'What is a method?',
                                options: [
                                    'A variable in a class',
                                    'A function inside a class',
                                    'A type of loop',
                                    'A module'
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: 'UI/UX Design Essentials',
        description: 'Learn the principles of great design. Master Figma, create stunning interfaces, and understand user psychology to build products people love.',
        instructor: 'Maria Design',
        instructorAvatar: 'MD',
        category: 'Design',
        level: 'Beginner',
        duration: '16 hours',
        lessons: 65,
        students: 8234,
        rating: 4.7,
        reviews: 1823,
        price: 0,
        isFree: true,
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
        tags: ['UI/UX', 'Figma', 'Design'],
        lastUpdated: '2024-01-12',
        passingScore: 80,
        chapters: [
            {
                title: 'Design Fundamentals',
                contents: [
                    {
                        id: 1,
                        type: 'video',
                        title: 'Introduction to UI/UX',
                        duration: '15:00',
                        videoUrl: 'https://example.com/design1.mp4',
                        required: true
                    },
                    {
                        id: 2,
                        type: 'video',
                        title: 'Color Theory',
                        duration: '25:00',
                        videoUrl: 'https://example.com/design2.mp4',
                        required: true
                    },
                    {
                        id: 3,
                        type: 'pdf',
                        title: 'Color Palette Guide',
                        fileUrl: 'https://example.com/color-palette.pdf',
                        fileSize: '4.2 MB',
                        required: false
                    },
                    {
                        id: 4,
                        type: 'video',
                        title: 'Typography Basics',
                        duration: '20:00',
                        videoUrl: 'https://example.com/design3.mp4',
                        required: true
                    },
                    {
                        id: 5,
                        type: 'link',
                        title: 'Google Fonts',
                        url: 'https://fonts.google.com',
                        description: 'Free fonts for your designs',
                        required: false
                    },
                    {
                        id: 6,
                        type: 'exercise',
                        title: 'Design Fundamentals Quiz',
                        duration: '10 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What does UI stand for?',
                                options: [
                                    'User Interaction',
                                    'User Interface',
                                    'Universal Internet',
                                    'Unique Identifier'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'What does UX stand for?',
                                options: [
                                    'User Experience',
                                    'User Extension',
                                    'Unique Experience',
                                    'Universal Exchange'
                                ],
                                correctAnswer: 0
                            },
                            {
                                id: 3,
                                question: 'Which is a primary color?',
                                options: [
                                    'Green',
                                    'Orange',
                                    'Blue',
                                    'Purple'
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: 4,
                                question: 'What is typography?',
                                options: [
                                    'The art of photography',
                                    'The art of arranging type',
                                    'A type of graph',
                                    'A design tool'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'What is Figma?',
                                options: [
                                    'A programming language',
                                    'A design and prototyping tool',
                                    'A database',
                                    'A web browser'
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js. Learn Express, databases, authentication, and deployment strategies.',
        instructor: 'James Backend',
        instructorAvatar: 'JB',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '20 hours',
        lessons: 85,
        students: 15632,
        rating: 4.6,
        reviews: 2156,
        price: 199000,
        isFree: false,
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
        tags: ['Node.js', 'Backend', 'Express'],
        lastUpdated: '2024-01-08',
        passingScore: 80,
        chapters: [
            {
                title: 'Getting Started',
                contents: [
                    {
                        id: 1,
                        type: 'video',
                        title: 'Introduction to Node.js',
                        duration: '18:00',
                        videoUrl: 'https://example.com/node1.mp4',
                        required: true
                    },
                    {
                        id: 2,
                        type: 'video',
                        title: 'Setting Up Express',
                        duration: '22:00',
                        videoUrl: 'https://example.com/node2.mp4',
                        required: true
                    },
                    {
                        id: 3,
                        type: 'pdf',
                        title: 'Express.js Cheat Sheet',
                        fileUrl: 'https://example.com/express-cheatsheet.pdf',
                        fileSize: '1.1 MB',
                        required: false
                    },
                    {
                        id: 4,
                        type: 'link',
                        title: 'Node.js Documentation',
                        url: 'https://nodejs.org/docs',
                        description: 'Official Node.js documentation',
                        required: false
                    },
                    {
                        id: 5,
                        type: 'exercise',
                        title: 'Node.js Basics Quiz',
                        duration: '10 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What is Node.js?',
                                options: [
                                    'A web browser',
                                    'A JavaScript runtime',
                                    'A database',
                                    'A CSS framework'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'Which package manager comes with Node.js?',
                                options: [
                                    'pip',
                                    'npm',
                                    'composer',
                                    'gem'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 3,
                                question: 'What is Express.js?',
                                options: [
                                    'A database',
                                    'A web framework for Node.js',
                                    'A programming language',
                                    'A testing library'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 4,
                                question: 'How do you start a Node.js file?',
                                options: [
                                    'run app.js',
                                    'node app.js',
                                    'start app.js',
                                    'execute app.js'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'What does require() do?',
                                options: [
                                    'Prints output',
                                    'Imports modules',
                                    'Creates files',
                                    'Deletes modules'
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        title: 'Machine Learning with TensorFlow',
        description: 'Dive deep into machine learning. Build neural networks, understand deep learning concepts, and create AI-powered applications.',
        instructor: 'Dr. Alex AI',
        instructorAvatar: 'AA',
        category: 'Data Science',
        level: 'Advanced',
        duration: '35 hours',
        lessons: 150,
        students: 9876,
        rating: 4.9,
        reviews: 1567,
        price: 499000,
        isFree: false,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
        tags: ['Machine Learning', 'TensorFlow', 'AI'],
        lastUpdated: '2024-01-15',
        passingScore: 80,
        chapters: [
            {
                title: 'ML Foundations',
                contents: [
                    {
                        id: 1,
                        type: 'video',
                        title: 'What is Machine Learning?',
                        duration: '25:00',
                        videoUrl: 'https://example.com/ml1.mp4',
                        required: true
                    },
                    {
                        id: 2,
                        type: 'video',
                        title: 'Types of ML Algorithms',
                        duration: '30:00',
                        videoUrl: 'https://example.com/ml2.mp4',
                        required: true
                    },
                    {
                        id: 3,
                        type: 'pdf',
                        title: 'ML Algorithms Overview',
                        fileUrl: 'https://example.com/ml-algorithms.pdf',
                        fileSize: '5.5 MB',
                        required: false
                    },
                    {
                        id: 4,
                        type: 'link',
                        title: 'TensorFlow Tutorials',
                        url: 'https://www.tensorflow.org/tutorials',
                        description: 'Official TensorFlow tutorials',
                        required: false
                    },
                    {
                        id: 5,
                        type: 'exercise',
                        title: 'ML Foundations Quiz',
                        duration: '15 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What is supervised learning?',
                                options: [
                                    'Learning without data',
                                    'Learning from labeled data',
                                    'Learning from images only',
                                    'Learning without algorithms'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'What is unsupervised learning?',
                                options: [
                                    'Learning from labeled data',
                                    'Learning from unlabeled data',
                                    'Learning with teachers',
                                    'Learning from books'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 3,
                                question: 'What is a neural network?',
                                options: [
                                    'A type of internet',
                                    'A computing system inspired by the brain',
                                    'A social network',
                                    'A database'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 4,
                                question: 'What is TensorFlow?',
                                options: [
                                    'A web browser',
                                    'An ML framework by Google',
                                    'A programming language',
                                    'A database'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'What is a training dataset?',
                                options: [
                                    'Data used for testing',
                                    'Data used to train the model',
                                    'Data from gyms',
                                    'Random data'
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 6,
        title: 'Digital Marketing Mastery',
        description: 'Learn how to grow businesses online. Master SEO, social media marketing, paid advertising, and analytics.',
        instructor: 'Emma Marketing',
        instructorAvatar: 'EM',
        category: 'Marketing',
        level: 'Beginner',
        duration: '14 hours',
        lessons: 55,
        students: 22341,
        rating: 4.5,
        reviews: 3421,
        price: 0,
        isFree: true,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
        tags: ['Marketing', 'SEO', 'Social Media'],
        lastUpdated: '2024-01-11',
        passingScore: 80,
        chapters: [
            {
                title: 'Marketing Basics',
                contents: [
                    {
                        id: 1,
                        type: 'video',
                        title: 'Digital Marketing Overview',
                        duration: '20:00',
                        videoUrl: 'https://example.com/marketing1.mp4',
                        required: true
                    },
                    {
                        id: 2,
                        type: 'video',
                        title: 'Understanding Your Audience',
                        duration: '25:00',
                        videoUrl: 'https://example.com/marketing2.mp4',
                        required: true
                    },
                    {
                        id: 3,
                        type: 'pdf',
                        title: 'Marketing Strategy Template',
                        fileUrl: 'https://example.com/marketing-template.pdf',
                        fileSize: '2.0 MB',
                        required: false
                    },
                    {
                        id: 4,
                        type: 'link',
                        title: 'Google Analytics Academy',
                        url: 'https://analytics.google.com/analytics/academy',
                        description: 'Free courses from Google',
                        required: false
                    },
                    {
                        id: 5,
                        type: 'exercise',
                        title: 'Marketing Basics Quiz',
                        duration: '10 min',
                        required: true,
                        passingScore: 80,
                        questions: [
                            {
                                id: 1,
                                question: 'What is SEO?',
                                options: [
                                    'Social Engagement Online',
                                    'Search Engine Optimization',
                                    'Site Enhancement Operation',
                                    'Simple Email Outreach'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'What is a target audience?',
                                options: [
                                    'Random people',
                                    'Specific group of consumers',
                                    'Competitors',
                                    'All internet users'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 3,
                                question: 'What is CTR?',
                                options: [
                                    'Content Through Rate',
                                    'Click Through Rate',
                                    'Customer Trust Rating',
                                    'Cost To Run'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 4,
                                question: 'What is content marketing?',
                                options: [
                                    'Buying ads',
                                    'Creating valuable content to attract customers',
                                    'Cold calling',
                                    'Email spam'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 5,
                                question: 'What is ROI?',
                                options: [
                                    'Return on Investment',
                                    'Rate of Interest',
                                    'Reach of Internet',
                                    'Range of Income'
                                ],
                                correctAnswer: 0
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

// Categories
export const categories = [
    { id: 1, name: 'Web Development', icon: 'Globe', count: 245 },
    { id: 2, name: 'Programming', icon: 'Code', count: 189 },
    { id: 3, name: 'Design', icon: 'Palette', count: 134 },
    { id: 4, name: 'Data Science', icon: 'BarChart2', count: 98 },
    { id: 5, name: 'Marketing', icon: 'Megaphone', count: 156 },
    { id: 6, name: 'Business', icon: 'Briefcase', count: 112 },
    { id: 7, name: 'Other', icon: 'MoreHorizontal', count: 75 },
];

// Content Types
export const contentTypes = [
    { type: 'video', label: 'Video', icon: 'PlayCircle', required: true },
    { type: 'pdf', label: 'PDF Document', icon: 'FileText', required: false },
    { type: 'link', label: 'External Link', icon: 'ExternalLink', required: false },
    { type: 'exercise', label: 'Exercise/Quiz', icon: 'ClipboardCheck', required: true }
];

// Reviews (some pending approval)
export const reviews = [
    { id: 1, courseId: 1, userId: 1, userName: 'John Customer', rating: 5, comment: 'Excellent course! Very comprehensive and easy to follow.', status: 'approved', createdAt: '2024-01-10' },
    { id: 2, courseId: 1, userId: 2, userName: 'Jane Learner', rating: 4, comment: 'Great content, would recommend to beginners.', status: 'approved', createdAt: '2024-01-08' },
    { id: 3, courseId: 2, userId: 3, userName: 'Mike Student', rating: 5, comment: 'Best Python course I have ever taken!', status: 'pending', createdAt: '2024-01-15' },
    { id: 4, courseId: 3, userId: 4, userName: 'Sara Designer', rating: 4, comment: 'Very helpful for understanding design principles.', status: 'pending', createdAt: '2024-01-14' },
    { id: 5, courseId: 1, userId: 5, userName: 'Tom Developer', rating: 3, comment: 'Good but could use more advanced examples.', status: 'rejected', createdAt: '2024-01-12' },
];

// Stats for dashboard
export const stats = {
    totalStudents: 103147,
    totalCourses: 856,
    totalInstructors: 234,
    totalCertificates: 45632
};

// Helper function to get content counts
export const getContentCounts = (course) => {
    let videos = 0, pdfs = 0, links = 0, exercises = 0;

    course.chapters?.forEach(chapter => {
        chapter.contents?.forEach(content => {
            switch (content.type) {
                case 'video': videos++; break;
                case 'pdf': pdfs++; break;
                case 'link': links++; break;
                case 'exercise': exercises++; break;
            }
        });
    });

    return { videos, pdfs, links, exercises };
};

// Helper function to get all contents from a course
export const getAllContents = (course) => {
    return course.chapters?.flatMap(chapter => chapter.contents) || [];
};

// Helper function to get required contents only
export const getRequiredContents = (course) => {
    return getAllContents(course).filter(content => content.required);
};
