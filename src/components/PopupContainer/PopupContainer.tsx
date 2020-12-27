import React, { FC } from "react";
import { motion } from "framer-motion";

interface PopupProps {
  newGame: () => void;
}

const popupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.8,
    },
  },
};

const PopupContainer: FC<PopupProps> = ({ newGame }) => {
  return (
    <motion.div
      variants={popupVariants}
      initial='hidden'
      animate='visible'
      className='popup-conntainer'
    >
      <div className='popup'>
        <h3>Game Over!</h3>
        <button onClick={newGame}>⭯ Try Again</button>
      </div>
    </motion.div>
  );
};

export default PopupContainer;
