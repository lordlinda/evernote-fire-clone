const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  titleInput: {
    height: "50px",
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    fontSize: "18px",
    width: "100%",
    backgroundColor: "#29487d",
    color: "white",
    paddingLeft: "90px",
  },
  editIcon: {
    position: "absolute",
    left: "20px",
    top: "12px",
    color: "white",
    width: "10",
    height: "10",
  },
  editorContainer: {
    height: "100%",
    boxSizing: "border-box",
  },
  addIcon: {
    position: "absolute",
    left: "50px",
    top: "12px",
    color: "white",
    width: "10",
    height: "10",
  },
});

export default styles;
