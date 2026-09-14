const Button = ({ title, onClick }) => {
    return (
        <button className="comic-button" onClick={onClick}>{title}</button>
    );
};

export default Button;
