const styles = (theme) => ({
  listItem: {
    cursor: "pointer",
    justifyContent: "space-between",
  },
  textSection: {
    width: "300px",
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red",
    },
  },
});

export default styles;
