interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="text-center py-20 animate-scale-in">
            <div className="text-6xl mb-6 animate-pulse">{icon}</div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">{description}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 glow-hover"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
