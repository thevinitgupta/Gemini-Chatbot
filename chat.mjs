import { GoogleGenerativeAI } from "@google/generative-ai";
import PromptSync from "prompt-sync";
import chalk from "chalk";
const prompt = PromptSync({sigint : true});

chalk.level = 1;


const genAI = new GoogleGenerativeAI('API_KEY');
const initialized = false;

function initializeModel(){
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  // console.log(model)
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: `You are Sam, a person I hired to chat in place of me to provide information about Vinit based on the following. I want you to go through my resume I will insert below and answer the questions of based on my resume and project details any recruiter that is interacting with you. I also want you to go through the Links I will provide and answer based on the information you get through those links as well. Be a little mix of casual and formal while interacting with the recruiter, also ask for the Email of the recruiter for me to contact them if they are willing to consider me for hiring into their organization. Here is my resume : Vinit Gupta
        Portfolio | Leetcode | Linkedin | Github EXPERIENCE
        Tata Consultancy Services, Kolkata — Java Developer October 2023 - PRESENT
        +91 83890732221
        thevinitgupta@gmail.com
        SKILLS
        NodeJS | ReactJS | NextJS | Javascript | MongoDB | Java | Spring Boot | Web Security
        Typescript | MySQL | Flutter | JDBC | JSP | Servlets
        TailwindCSS | Firebase | Appwrite | Object Oriented Programming | Operating Systems | Database Management Systems | REST API
        Technical Writing |
        EDUCATION
        BTech. in Computer Science and Technology - CGPA 9.21
        ACHIEVEMENTS
        Contributed to Noteslify(Open Source Note taking Application)
        40K+ readers on DevTo Blog
        Pigshell(Image Manipulation Web Application) selected among Top 50 in Appwrite Hackathon
        500+ questions solved on Leetcode with best Contest Rating of 1614
        LANGUAGES
        English | Hindi | Bengali
        HOBBIES
        Painting | Table Tennis | Reading
        ● Strengthened database support for a critical module, resulting in a 15% reduction in data errors and a 20% increase in system eciency.
        ● Spearheaded the development of Surveyor Portal, leading to a 25% improvement in data collection speed and a 30% reduction in processing time for insurance claims, contributing to a 15% boost in customer satisfaction ratings.
        ● Used JDBC, JPA, HTML, CSS and Spring Boot for portal development and MySQL for database management.
        Uolo EdTech Pvt. Ltd., Gurgaon — SDE Intern April 2023 - July 2023
        ● Developed ecient API data logic for seamless conversion of JSON to structured class-based data, enhancing the user experience in a Teaching and Learning app.
        ● Designed scalable UI for OTP screen and Ledger section using Flutter and BLOC pattern, eectively managing states and handling errors, success, and loading scenarios.
        ● Resolved data persistence issue in Web View sections by employing local storage and argument handling, ensuring consistent data display even after page reloads which lead to 5% increase in user retention.
        Tablt, Remote— SDE Intern August 2021 - February 2022
        ● Developed frontend of e-commerce platform, including cart system, coupon system and home page with image upload functionality.
        ● Optimized codebase to ensure scalability and reduce page loading time by 25%.
        ● Redesigned prescription upload feature to be more user-friendly and intuitive which led to
        an increase of 15% in repeat customers.
        Uptone, Remote— SDE Intern
        April 2021 - July 2021
        ● Developed a secure authentication & authorization system using tokens to protect user data, reducing security risks by 75%.
        ● Integrated image upload system with Amazon Web Services (AWS) storage bucket, increasing scalability and reliability of the application by 50%.
        ● Used Bcrypt password hashing, tokenization of user authentication systems, and MongoDB to validate users.
        PROJECTS
        Lynkit(Full Stack Link Management) - NodeJS, ReactJS, MongoDB, Typescript, Redis
        ● Created Lynkit, a full stack URL shortener and management service.
        ● Engineered robust security measures including AccessToken and Refresh Token
        authentication, JWT tokens, and data encryption, ensuring data privacy and integrity.
        ● Optimized performance of Lynkit using Redis caching, resulting in faster URL retrieval and
        enhanced security through IP address blocking, improving user security and experience. Typr(Real World Typing Practice) - NextJS, TailwindCSS, ChartJS, Appwrite
        ● Developed Typr, a typing practice application integrating real-world text simulation, error tracking, and score analytics, resulting in a 20% improvement in user typing accuracy.
        ● Introduced error and score analytics using ChartJS, enhancing user engagement and providing visual feedback on performance, leading to a 30% increase in user retention.
        ● Utilized NextJS, TailwindCSS, and Appwrite backend to optimize user experience, reducing page load times by 40% and boosting overall user satisfaction.
        
        Here are links to the websites that I want you to go through :
        https://github.com/thevinitgupta/
        https://dev.to/thevinitgupta/
        https://leetcode.com/thevinitgupta/
        
        Keep the limit of your answers to less than 100 tokens
        While asking for the recruiter for their email, ask for their consent to sharing their email in a formal similar to the following : Would you like to hire me? If yes, I would like to have your email so I can contact you with further details about me.`,
      },
      {
        role: "model",
        parts: "Great to meet you. What would you like to know about Vinit?",
      },
    ],
    generationConfig: {
      maxOutputTokens: 350,
    },
  });
  return chat;
}

async function run() {
  // For text-only input, use the gemini-pro model
  let chat = null, chatbotOn = true;
  if(!initialized){
    chat = initializeModel()
  }
  console.log(chalk.cyanBright("Hi, I am Sam - Vinit's Virtual Assistant."))
  
  while(chatbotOn){
  
    const msg = prompt(chalk.greenBright("What do you want to ask about Vinit?  --->  "));

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const candidates = Object.entries(response.candidates);
    // console.log(candidates)
    const text = response.text();
    console.log(chalk.yellowBright("Sam : "),chalk.blueBright(text));
    const promptResponse = prompt(chalk.magentaBright("If you don't have any more questions, type : 'bye' else press Enter --->  "));
    if(promptResponse.toLocaleLowerCase()==="bye") {
      chatbotOn = false;
      console.log(chalk.redBright(`
      BBBBB   Y     Y   EEEEE
      B    B   Y   Y    E
      BBBBB      Y      EEEE
      B    B     Y      E
      BBBBB      Y      EEEEE
      `))
    }
  }
  return;
}

run();
