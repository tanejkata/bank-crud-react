const Notification = ({ message, type }) => {
  return (
    <div
      style={{ zIndex: 1 }}
      className="position-fixed top-50 start-50 translate-middle"
    >
      <div className={"alert alert-" + type} role="alert">
        {message}
      </div>
    </div>
  );
};

export default Notification;
