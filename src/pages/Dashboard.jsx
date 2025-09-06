import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNew, setShowNew] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/projects`)
            .then((r) => r.json())
            .then((data) => setProjects(data || []))
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    async function createProject(e) {
        e.preventDefault();
        const temp = { id: Date.now(), name, description: desc };
        setProjects((p) => [temp, ...p]);
        setShowNew(false);
        setName("");
        setDesc("");
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="px-5 py-4 text-xl font-bold">SynergySphere</div>
                <nav className="px-2 space-y-1">
                    {["Overview", "Projects", "Tasks", "Calendar", "Settings"].map((i) => (
                        <a
                            key={i}
                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer"
                        >
                            {i}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* main */}
            <main className="flex-1">
                {/* topbar */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                        <input
                            placeholder="Search projects..."
                            className="w-72 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowNew(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                + New Project
                            </button>
                            <button onClick={logout} className="px-3 py-2 rounded-lg border">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* content */}
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <h2 className="text-2xl font-bold mb-4">Projects</h2>

                    {loading ? (
                        <div className="text-gray-600">Loading…</div>
                    ) : projects.length === 0 ? (
                        <div className="text-gray-600">No projects yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((p) => (
                                <div key={p.id} className="bg-white rounded-xl shadow p-4">
                                    <h3 className="font-semibold text-lg">{p.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                                        {p.description}
                                    </p>
                                    <div className="mt-3 text-xs text-gray-500">ID: {p.id}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* modal */}
            {showNew && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                    <form
                        onSubmit={createProject}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 space-y-3"
                    >
                        <div className="text-lg font-semibold">Create Project</div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Project name"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Description"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        <div className="flex justify-end gap-2 pt-1">
                            <button
                                type="button"
                                onClick={() => setShowNew(false)}
                                className="px-3 py-2 rounded-lg border"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
