import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const movieQuotes = [
  "\"You had me at hello.\" - Jerry Maguire",
  "\"O Captain, my Captain.\" - Dead Poets Society",
  "\"I hate the way I don't hate you.\" - 10 Things I Hate About You",
  "\"Life is like a box of chocolates... you never know what you're gonna get.\" - Forrest Gump",
  "\"May the Force be with you.\" - Star Wars",
  "\"You complete me.\" - Jerry Maguire",
  "\"I don't want to survive. I want to live.\" - 12 Years a Slave",
  "\"Amaze. Amaze. Amaze.\" - Project Hail Mary",
  "\"Elementary, my dear Watson.\" - The Adventures of Sherlock Holmes",
  "\"There's no place like home.\" - The Wizard of Oz",
  "\"I'm the king of the world!\" - Titanic",
  "\"Carpe diem. Seize the day, boys.\" - Dead Poets Society",
  "\"It's alive! It's alive!\" - Frankenstein",
  "\"I'll be back.\" - The Terminator",
  "\"You're gonna need a bigger boat.\" - Jaws",
  "\"Here's looking at you, kid.\" - Casablanca",
  "\"My precious.\" - The Lord of the Rings: The Two Towers",
  "\"Houston, we have a problem.\" - Apollo 13",
  "\"There's no crying in baseball!\" - A League of Their Own",
  "\"E.T. phone home.\" - E.T. the Extra-Terrestrial",
  "\"You can't handle the truth!\" - A Few Good Men",
  "\"A martini. Shaken, not stirred.\" - Goldfinger",
  "\"If you build it, he will come.\" - Field of Dreams",
  "\"The stuff that dreams are made of.\" - The Maltese Falcon",
  "\"Magic Mirror on the wall, who is the fairest one of all?\" - Snow White",
  "\"Keep your friends close, but your enemies closer.\" - The Godfather Part II",
  "\"I am your father.\" - Star Wars: The Empire Strikes Back",
  "\"Just keep swimming.\" - Finding Nemo",
  "\"To infinity and beyond!\" - Toy Story",
  "\"Why so serious?\" - The Dark Knight",
  "\"I feel the need - the need for speed!\" - Top Gun",
  "\"I see dead people.\" - The Sixth Sense",
  "\"Say 'hello' to my little friend!\" - Scarface"
];

const Loader = ({ setLoading }) => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote on mount
    const randomQuote = movieQuotes[Math.floor(Math.random() * movieQuotes.length)];
    setQuote(randomQuote);

    // Show loader for 3.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Cinematic Background Layers */}
      <div className="spotlight"></div>
      <div className="beams"></div>
      <div className="bars"></div>
      <div className="noise"></div>
      <div className="vignette"></div>

      <div className="relative flex flex-col items-center justify-center z-10 gap-12">
        <div className="square-loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>
        
        {/* Subtle Loading Text and Random Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center text-center px-6 max-w-2xl"
        >
          <span 
            className="font-bold text-xs tracking-[0.3em] uppercase text-white/50 mb-6"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Loading Experience...
          </span>
          <span 
            className="text-white/90 italic font-light text-xl md:text-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {quote}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
