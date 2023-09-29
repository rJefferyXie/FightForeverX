const fadeDown = {
  hidden: {
    y: "-10vh",
    opacity: 0,
    transition: {
      duration: 0.5
    }
  },
  visible: {
    y: "0",
    opacity: 1
  },
  exit: {
    y: '10vh',
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default fadeDown;