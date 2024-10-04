import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Box, Typography, Button, Link as MuiLink, Link } from "@mui/material";
import { GiClick } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function RotatingCard({ children }) {
  const [rotate, setRotate] = useState(false);

  const rotate0 = () => {
    setRotate(false);
  };

  const rotate180 = () => {
    setRotate(true);
  };

  return (
    <Box sx={{ perspective: "50rem", height: "100%" }} onMouseEnter={rotate180} onMouseLeave={rotate0}>
      <Card
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          position: "relative",
          transform: rotate ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1)",
          width: "100%", 
          height: "100%", 
        }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { rotate });
        })}
      </Card>
    </Box>
  );
}

RotatingCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RotatingCard;

function RotatingCardFront({ image, title, description }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="1rem"
      width="100%"
      height='100%' 
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: `linear-gradient(rgba(51, 51, 51, 0.85), rgba(51, 51, 51, 0.85)), url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
      }}
    >
      <Box py={12} px={3} textAlign="center" lineHeight={1}>
        <GiClick style={{width: '100%', textAlign: 'center'}} fontSize='2.5rem' color="#fff" />
        <Typography variant="h3" color="white" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="white" opacity={0.8}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

function RotatingCardBack({ image, title, description, action, rotate }) {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="1rem"
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      left={0}
      zIndex={5} 
      sx={{
        backgroundImage: `linear-gradient(rgba(51, 51, 51, 0.85), rgba(51, 51, 51, 0.85)), url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: rotate ? "visible" : "hidden",
        transform: "rotateY(180deg)",
        opacity: 1,
      }}
    >
      <Box pt={12} pb={2} px={2} textAlign="center" lineHeight={1}>
        <Typography variant="h3" color="white" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="white" opacity={0.8}>
          {description}
        </Typography>
        {action && (
          <Box width="50%" mt={4} mb={2} mx="auto">
            <Button
              component={action.type === "external" ? MuiLink : Link}
              onClick={()=>{
                navigate(action.route)
              }}
              sx={{ 
                backgroundColor: action.btn_background_color,
                color: action.btn_color,
                size: "small",
                fullWidth: true,
              }}
            >
              {action.label}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

RotatingCardFront.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

RotatingCardBack.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.shape({
    btn_background_color: PropTypes.string.isRequired,
    btn_color: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

export { RotatingCard, RotatingCardFront, RotatingCardBack };
