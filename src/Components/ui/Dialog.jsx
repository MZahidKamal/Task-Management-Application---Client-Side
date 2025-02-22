const Dialog = ({ open, onOpenChange, children }) => {
    return (
        <div className={`fixed inset-0 ${open ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-30" onClick={onOpenChange} />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white rounded p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Dialog }; 