import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Box,
  Fade,
} from "@mui/material";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { AlternateEmail } from "@mui/icons-material";

const QuoteCard = ({ themeColor, setThemeColor, colors }) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [visible, setVisible] = useState(false);
  const hasFetched = useRef(false);

  const fetchQuote = async () => {
    setVisible(false);

    try {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();

      let newColor;
      do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      } while (newColor === themeColor);

      setTimeout(() => {
        setQuote(data.content);
        setAuthor(data.author);
        setThemeColor(newColor);
        setVisible(true);
      }, 300);
    } catch (error) {
      console.error("Failed to load quote");
      setQuote("Couldn't load a Quote");
      setAuthor("");
    } finally {
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchQuote();
      hasFetched.current = true;
    }
  }, []);

  const handleTweet = () => {
    const tweetText = `${quote} - ${author}`;
    const tweetURL = `https://x.com/intent/post?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetURL, "_blank");
  };

  const handleInstagram = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    const instaURL = `https://www.instagram.com/accounts/login/?hl=en`;
    window.open(instaURL, "_blank");
    alert("Quote copied to clipboard");
  };

  return (
    <Card sx={{ width: 600, p: 2, borderRadius: 2, boxShadow: 5 }}>
      <Fade in={visible} timeout={400}>
        <Box>
          <CardContent>
            <FormatQuoteIcon
              sx={{ fontSize: 60, color: themeColor }}
            ></FormatQuoteIcon>
            <Typography
              gutterBottom
              variant="h5"
              align="center"
              sx={{ p: "5px 10px", mt: 2 }}
            >
              {quote}
            </Typography>
            <Typography variant="subtitle1" align="right" sx={{ mt: 2, fontStyle: "italic" }}>
              - {author}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Box>
              <IconButton>
                <XIcon onClick={handleTweet}></XIcon>
              </IconButton>
              <IconButton>
                <InstagramIcon onClick={handleInstagram}></InstagramIcon>
              </IconButton>
            </Box>
            <Button
              variant="contained"
              onClick={fetchQuote}
              sx={{ bgcolor: themeColor }}
            >
              New Quote
            </Button>
          </CardActions>
        </Box>
      </Fade>
    </Card>
  );
};

export default QuoteCard;
