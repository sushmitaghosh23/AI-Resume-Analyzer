import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Archive,
  Settings,
  LifeBuoy,
  LogOut,
  PlusCircle,
  Search,
  ChevronLeft,
  Clock,
  Upload,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("base"); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [resumes, setResumes] = useState([]); 
  const fileRef = useRef(null);
  const [search, setSearch] = useState("");

 
  const [dragActive, setDragActive] = useState(false);

  const handleCreateNew = () => setShowCreateModal(true);

  const handleCreateFromUpload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const newResume = {
      id: Date.now().toString(),
      name: f.name,
      type: "Base Resume",
      uploadedAt: new Date().toISOString(),
    };
    setResumes((r) => [newResume, ...r]);
    setShowCreateModal(false);

    // Placeholder: real upload code (uncomment & change URL when backend ready)
    /*
    const fd = new FormData();
    fd.append('resume', f);
    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: fd
    });
    const data = await res.json();
    console.log('upload result', data);
    */

    alert(`(frontend) Uploaded: ${f.name}`);
  };

  const handleCreateBlank = () => {
    const newResume = {
      id: Date.now().toString(),
      name: `Untitled Resume ${resumes.length + 1}`,
      type: "Base Resume",
      uploadedAt: new Date().toISOString(),
    };
    setResumes((r) => [newResume, ...r]);
    setShowCreateModal(false);
    navigate(`/editor/${newResume.id}`);
  };

  // Drag handlers
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer?.files?.[0];
    if (!f) return;
    handleCreateFromUpload({ target: { files: [f] } });
  };

  const filteredResumes = resumes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-slate-800/60 border-r border-slate-700 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div>
                <div className="text-lg font-semibold text-white">
                  CAREERALIGN
                </div>
                <div className="text-xs text-slate-300">AI resume tools</div>
              </div>
            </div>
            <button
              className="p-1 text-slate-300 hover:bg-slate-700 rounded"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-700/30 text-sky-300 font-medium">
              My Resumes
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700/40 text-slate-300">
              My Jobs
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700/40 text-slate-300">
              My Cover Letters
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700/40 text-slate-300">
              Account Settings
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-700/40 text-slate-300">
              Help / Report a bug
            </button>
          </nav>

          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 px-3 py-3 rounded-md bg-slate-800/60">
              <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center">
                U
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">you@example.com</div>
                <div className="text-xs text-slate-400">Free plan</div>
              </div>
              <button className="text-slate-300">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main - Expanded drop zone for entire main area */}
        <main
          className="flex-1 p-8 relative"
          onDragOver={onDragOver}
          onDragEnter={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {/* overlay shown when dragging file over main area */}
          {dragActive && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full bg-slate-800/50 border-4 border-dashed border-indigo-500 rounded-lg flex items-center justify-center text-indigo-100 text-lg">
                Drop file to upload...
              </div>
            </div>
          )}

          {/* Top */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Base Resumes</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700 rounded-lg p-6">
                  <h3 className="font-semibold text-white">Base Resume</h3>
                  <p className="text-sm text-slate-300 mt-2">
                    A main resume targeted to a specific role/title. Create at
                    most one base resume per role.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleCreateNew}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
                    >
                      <PlusCircle className="w-4 h-4" /> Create New
                    </button>

                    <button
                      onClick={() => fileRef.current?.click()}
                      className="ml-3 px-3 py-2 rounded-md bg-slate-700 text-slate-200"
                    >
                      Upload
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-6">
                  <h3 className="font-semibold text-white">
                    Job Tailored Resume
                  </h3>
                  <p className="text-sm text-slate-300 mt-2">
                    Targeted resume built off a Base Resume.
                  </p>
                  <div className="mt-4">
                    <button
                      className="px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-slate-300"
                      disabled
                    >
                      Select Base Resume
                    </button>
                  </div>
                  <div className="mt-3 text-xs text-amber-400">
                    Create base resume first
                  </div>
                </div>
              </div>
            </div>

            <aside className="w-64 space-y-4">
              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-300">Usage</div>
                <div className="mt-2 font-semibold text-white">
                  {" "}
                  {resumes.length} / 5 Base Resumes
                </div>
                <div className="mt-3 h-2 bg-slate-700 rounded">
                  <div
                    style={{ width: `${(resumes.length / 5) * 100}%` }}
                    className="h-2 bg-indigo-600 rounded"
                  />
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-300">Offer</div>
                <div className="font-semibold mt-2">Limited Time: 50% OFF!</div>
                <div className="mt-4">
                  <button className="w-full px-3 py-2 rounded-md bg-rose-500 text-white">
                    Claim 50% Discount
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Tabs / Search */}
          <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveTab("base")}
                  className={`px-3 py-2 ${
                    activeTab === "base"
                      ? "text-indigo-300 border-b-2 border-indigo-500"
                      : "text-slate-300"
                  }`}
                >
                  Base Resumes
                </button>
                <button
                  onClick={() => setActiveTab("tailored")}
                  className={`px-3 py-2 ${
                    activeTab === "tailored"
                      ? "text-indigo-300 border-b-2 border-indigo-500"
                      : "text-slate-300"
                  }`}
                >
                  Job Tailored Resumes
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search base resumes..."
                    className="pl-10 pr-4 py-2 rounded-md bg-slate-900/60 border border-slate-700 w-72 text-slate-200"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                <div className="text-sm text-slate-400">Sort</div>
              </div>
            </div>

            {/* list / empty */}
            <div className="mt-6">
              {activeTab === "base" && (
                <div>
                  {filteredResumes.length === 0 ? (
                    // EMPTY STATE (still clickable)
                    <div
                      className={`p-8 border border-slate-700 rounded-md text-center text-slate-400 relative transition-colors`}
                      style={{ minHeight: 160 }}
                    >
                      <div className="mb-4">
                        <div>No base resumes yet.</div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={handleCreateNew}
                          className="px-4 py-2 rounded-md bg-indigo-600 text-white"
                        >
                          Create New Base Resume
                        </button>

                        <button
                          onClick={() => fileRef.current?.click()}
                          className="ml-4 px-4 py-2 rounded-md bg-slate-700 text-slate-200"
                        >
                          Upload File
                        </button>
                      </div>

                      {/* hidden file input used by both modal and this button */}
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleCreateFromUpload}
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredResumes.map((r) => (
                        <div
                          key={r.id}
                          className="p-4 bg-slate-800/50 rounded-md border border-slate-700 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-white">
                              {r.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {new Date(r.uploadedAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/editor/${r.id}`)}
                              className="px-3 py-2 rounded-md bg-indigo-600 text-white"
                            >
                              Open
                            </button>
                            <button className="px-3 py-2 rounded-md bg-slate-700">
                              Duplicate
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "tailored" && (
                <div className="p-6 border border-slate-700 rounded-md text-slate-400">
                  No job-tailored resumes yet. Create a base resume to get
                  started.
                </div>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-white mb-4">Activity</h4>
              <div className="text-sm text-slate-400">No recent activity.</div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-white mb-4">Quick Tips</h4>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Create a base resume for each role</li>
                <li>• Use measurable achievements</li>
              </ul>
            </div>
          </div>
        </main>
      </div>

      {/* Create New modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 text-slate-100 rounded-lg shadow-lg w-full max-w-2xl p-6 border border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Create Base Resume</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Upload a resume or create a blank base resume to start.
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="p-4 border border-slate-700 rounded-lg hover:shadow-sm cursor-pointer flex flex-col items-start">
                  <div className="text-sm font-medium">Upload Resume</div>
                  <div className="text-xs text-slate-400 mt-2">
                    Upload a PDF/DOCX from your computer.
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleCreateFromUpload}
                  />
                  <div className="mt-4">
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white"
                    >
                      <Upload className="w-4 h-4" /> Upload file
                    </button>
                  </div>
                </label>

                <div className="p-4 border border-slate-700 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-medium">
                      Create a Base Resume (Editor)
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      Start from a blank resume with our editor.
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleCreateBlank}
                      className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700"
                    >
                      Create Blank
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
