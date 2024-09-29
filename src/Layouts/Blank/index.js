function Blank({ children }) {
    return (
        <div style={{ display: "block", height: '100%' }} className='body-container'>
            {children}
        </div>
    );
}

export default Blank;