const fadeRight = {
  hidden: {
    x: "-10vw",
    opacity: 0,
    transition: {
      duration: 0.25
    }
  },
  visible: {
    x: "0",
    opacity: 1,
  },
  exit: {
    x: '10vw',
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
}

export default fadeRight;