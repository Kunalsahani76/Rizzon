import LoadingSpinner from "../components/LoadingSpinner";

export default function BlogLoading() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Loading Blog Content</h2>
                    <p className="text-slate-600">Please wait while we fetch the latest articles...</p>
                </div>
                <LoadingSpinner size="lg" text="Loading articles..." />
            </div>
        </div>
    );
}