const fadeDown = {
  hidden: {
    y: "-10vh",
    opacity: 0,
    transition: {
      duration: 0.25
    }
  },
  visible: {
    y: "0",
    opacity: 1
  },
  exit: {
    y: '10vw',
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
}

export default fadeDown;