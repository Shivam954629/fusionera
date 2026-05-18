"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Visitor {
  id: number;
  full_name: string;
  company_name: string;
  phone_number: string;
  email: string;
  city: string;
  business_type: string;
  is_blocked: boolean;
  created_at: string;
}

interface Stats {
  total: number;
  today: number;
  topCities: { city: string; count: string }[];
  businessTypes: { business_type: string; count: string }[];
  recentVisitors: Visitor[];
}

interface Exhibitor {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  city: string;
  product_category: string;
  stall_type: string;
  message: string;
  status: string;
  created_at: string;
}

interface Video {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  category: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

type TabType =
  | "dashboard"
  | "visitors"
  | "newsletter"
  | "exhibitors"
  | "videos"
  | "podcasts"
  | "images"
  | "content";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "blocked"
  >("all");
  const [page, setPage] = useState(1);
  const [blockingId, setBlockingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Newsletter state
  const [nlTitle, setNlTitle] = useState("");
  const [nlSubtitle, setNlSubtitle] = useState("");
  const [nlContent, setNlContent] = useState("");
  const [nlPublished, setNlPublished] = useState(false);
  const [nlLoading, setNlLoading] = useState(false);
  const [nlSaved, setNlSaved] = useState(false);

  // Exhibitors state
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [exhibitorSearch, setExhibitorSearch] = useState("");
  const [exhibitorFilter, setExhibitorFilter] = useState("all");
  const [exhibitorLoading, setExhibitorLoading] = useState(false);

  // Videos state
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: "",
    url: "",
    category: "general",
    is_published: true,
  });
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [videoSaved, setVideoSaved] = useState(false);
  // Podcasts state
  const [podcasts, setPodcasts] = useState<
    {
      id: number;
      title: string;
      description: string;
      url: string;
      platform: string;
      is_published: boolean;
    }[]
  >([]);
  const [podcastLoading, setPodcastLoading] = useState(false);
  const [podcastForm, setPodcastForm] = useState({
    title: "",
    description: "",
    url: "",
    platform: "youtube",
    is_published: true,
  });
  const [editingPodcast, setEditingPodcast] = useState<{
    id: number;
    title: string;
    description: string;
    url: string;
    platform: string;
    is_published: boolean;
  } | null>(null);
  const [podcastSaved, setPodcastSaved] = useState(false);
  // Images state
  const [images, setImages] = useState<
    {
      id: number;
      title: string;
      url: string;
      category: string;
      type: string;
      is_published: boolean;
    }[]
  >([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageForm, setImageForm] = useState({
    title: "",
    url: "",
    category: "general",
    type: "gallery",
    is_published: true,
  });
  const [imageSaved, setImageSaved] = useState(false);
  const [editingImage, setEditingImage] = useState<{
    id: number; title: string; url: string; category: string; type: string; is_published: boolean;
  } | null>(null);

  // Content state
  const [contents, setContents] = useState<
    {
      id: number;
      key: string;
      title: string;
      subtitle: string;
      content: string;
      image_url: string;
      is_published: boolean;
    }[]
  >([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentForm, setContentForm] = useState({
    key: "",
    title: "",
    subtitle: "",
    content: "",
    image_url: "",
    is_published: true,
  });
  const [contentSaved, setContentSaved] = useState(false);

  const PER_PAGE = 15;

  // ── Newsletter ──
  const fetchNewsletter = useCallback(async () => {
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      if (data.data) {
        setNlTitle(data.data.title || "");
        setNlSubtitle(data.data.subtitle || "");
        setNlContent(data.data.content || "");
        setNlPublished(data.data.is_published || false);
      }
    } catch {}
  }, []);

  const saveNewsletter = async () => {
    setNlLoading(true);
    setNlSaved(false);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: nlTitle,
          subtitle: nlSubtitle,
          content: nlContent,
          is_published: nlPublished,
        }),
      });
      setNlSaved(true);
      setTimeout(() => setNlSaved(false), 3000);
    } catch {}
    setNlLoading(false);
  };

  // ── Exhibitors ──
  const fetchExhibitors = useCallback(async () => {
    setExhibitorLoading(true);
    try {
      const res = await fetch("/api/admin/exhibitors", {
        credentials: "include",
      });
      if (res.status === 401) return;
      const data = await res.json();
      setExhibitors(data.data || []);
    } catch {
    } finally {
      setExhibitorLoading(false);
    }
  }, []);

  const updateExhibitorStatus = async (id: number, status: string) => {
    try {
      await fetch("/api/admin/exhibitors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, status }),
      });
      setExhibitors((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e)),
      );
    } catch {}
  };

  const deleteExhibitor = async (id: number) => {
    try {
      await fetch("/api/admin/exhibitors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      setExhibitors((prev) => prev.filter((e) => e.id !== id));
    } catch {}
  };

  // ── Videos ──
  const fetchVideos = useCallback(async () => {
    setVideoLoading(true);
    try {
      const res = await fetch("/api/admin/videos", { credentials: "include" });
      const data = await res.json();
      setVideos(data.data || []);
    } catch {
    } finally {
      setVideoLoading(false);
    }
  }, []);

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    );
    return match ? match[1] : null;
  };

  const saveVideo = async () => {
    if (!videoForm.title.trim() || !videoForm.url.trim()) return;
    setVideoLoading(true);
    try {
      const ytId = getYouTubeId(videoForm.url);
      const thumbnail = ytId
        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        : "";
      if (editingVideo) {
        await fetch("/api/admin/videos", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id: editingVideo.id,
            ...videoForm,
            thumbnail,
          }),
        });
        setEditingVideo(null);
      } else {
        await fetch("/api/admin/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...videoForm, thumbnail }),
        });
      }
      setVideoForm({
        title: "",
        url: "",
        category: "general",
        is_published: true,
      });
      setVideoSaved(true);
      setTimeout(() => setVideoSaved(false), 3000);
      await fetchVideos();
    } catch {
    } finally {
      setVideoLoading(false);
    }
  };

  const deleteVideo = async (id: number) => {
    try {
      await fetch("/api/admin/videos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch {}
  };

  // ── Images ──
  const fetchImages = useCallback(async () => {
    setImageLoading(true);
    try {
      const res = await fetch("/api/admin/images", { credentials: "include" });
      const data = await res.json();
      setImages(data.data || []);
    } catch {
    } finally {
      setImageLoading(false);
    }
  }, []);

  const saveImage = async () => {
    if (!imageForm.url.trim()) return;
    setImageLoading(true);
    try {
      if (editingImage) {
        await fetch("/api/admin/images", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: editingImage.id, ...imageForm }),
        });
        setEditingImage(null);
      } else {
        await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(imageForm),
        });
      }
      setImageForm({ title: "", url: "", category: "general", type: "gallery", is_published: true });
      setImageSaved(true);
      setTimeout(() => setImageSaved(false), 3000);
      await fetchImages();
    } catch {
    } finally {
      setImageLoading(false);
    }
  };

  const deleteImage = async (id: number) => {
    try {
      await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {}
  };

  // ── Content ──
  const fetchContent = useCallback(async () => {
    setContentLoading(true);
    try {
      const res = await fetch("/api/admin/content", { credentials: "include" });
      const data = await res.json();
      setContents(data.data || []);
    } catch {
    } finally {
      setContentLoading(false);
    }
  }, []);

  const saveContent = async () => {
    if (!contentForm.key.trim() || !contentForm.title.trim()) return;
    setContentLoading(true);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(contentForm),
      });
      setContentForm({
        key: "",
        title: "",
        subtitle: "",
        content: "",
        image_url: "",
        is_published: true,
      });
      setContentSaved(true);
      setTimeout(() => setContentSaved(false), 3000);
      await fetchContent();
    } catch {
    } finally {
      setContentLoading(false);
    }
  };

  const deleteContent = async (id: number) => {
    try {
      await fetch("/api/admin/content", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      setContents((prev) => prev.filter((c) => c.id !== id));
    } catch {}
  };

  // ── Podcasts ──
  const fetchPodcasts = useCallback(async () => {
    setPodcastLoading(true);
    try {
      const res = await fetch("/api/admin/podcasts", {
        credentials: "include",
      });
      const data = await res.json();
      setPodcasts(data.data || []);
    } catch {
    } finally {
      setPodcastLoading(false);
    }
  }, []);

  const savePodcast = async () => {
    if (!podcastForm.title.trim() || !podcastForm.url.trim()) return;
    setPodcastLoading(true);
    try {
      if (editingPodcast) {
        await fetch("/api/admin/podcasts", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: editingPodcast.id, ...podcastForm }),
        });
        setEditingPodcast(null);
      } else {
        await fetch("/api/admin/podcasts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(podcastForm),
        });
      }
      setPodcastForm({
        title: "",
        description: "",
        url: "",
        platform: "youtube",
        is_published: true,
      });
      setPodcastSaved(true);
      setTimeout(() => setPodcastSaved(false), 3000);
      await fetchPodcasts();
    } catch {
    } finally {
      setPodcastLoading(false);
    }
  };

  const deletePodcast = async (id: number) => {
    try {
      await fetch("/api/admin/podcasts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      setPodcasts((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  };

  // ── Main data ──
  const fetchData = useCallback(async () => {
    try {
      const [statsRes, visitorsRes] = await Promise.all([
        fetch("/api/admin/stats", { credentials: "include" }),
        fetch("/api/visitors", { credentials: "include" }),
      ]);
      if (statsRes.status === 401 || visitorsRes.status === 401) {
        router.push("/admin");
        return;
      }
      setStats(await statsRes.json());
      const vd = await visitorsRes.json();
      setVisitors(vd.visitors || []);
    } catch {
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
    fetchNewsletter();
    const interval = setInterval(fetchData, 30000);
    const handleNewVisitor = () => fetchData();
    window.addEventListener("visitor-registered", handleNewVisitor);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "last-registration") fetchData();
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("visitor-registered", handleNewVisitor);
      window.removeEventListener("storage", handleStorage);
    };
  }, [fetchData, fetchNewsletter]);

  useEffect(() => {
    if (activeTab === "exhibitors") fetchExhibitors();
    if (activeTab === "videos") fetchVideos();
    if (activeTab === "podcasts") fetchPodcasts();
    if (activeTab === "images") fetchImages();
    if (activeTab === "content") fetchContent();
    if (editingVideo) {
      setVideoForm({
        title: editingVideo.title,
        url: editingVideo.url,
        category: editingVideo.category,
        is_published: editingVideo.is_published,
      });
    }
  }, [
    activeTab,
    fetchExhibitors,
    fetchVideos,
    fetchPodcasts,
    fetchImages,
    fetchContent,
    editingVideo,
  ]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/admin");
  };

  const toggleBlock = async (visitor: Visitor) => {
    const newBlocked = !visitor.is_blocked;
    const updateList = (list: Visitor[]) =>
      list.map((v) =>
        v.id === visitor.id ? { ...v, is_blocked: newBlocked } : v,
      );
    const revertList = (list: Visitor[]) =>
      list.map((v) =>
        v.id === visitor.id ? { ...v, is_blocked: visitor.is_blocked } : v,
      );
    setVisitors((prev) => updateList(prev));
    setStats((prev) =>
      prev
        ? { ...prev, recentVisitors: updateList(prev.recentVisitors) }
        : prev,
    );
    setBlockingId(visitor.id);
    try {
      const res = await fetch(`/api/visitors/${visitor.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ is_blocked: newBlocked }),
      });
      if (!res.ok) {
        setVisitors((prev) => revertList(prev));
        setStats((prev) =>
          prev
            ? { ...prev, recentVisitors: revertList(prev.recentVisitors) }
            : prev,
        );
      }
    } catch {
      setVisitors((prev) => revertList(prev));
    } finally {
      setBlockingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/visitors/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setVisitors((prev) => prev.filter((v) => v.id !== id));
        if (stats)
          setStats((prev) =>
            prev
              ? {
                  ...prev,
                  total: prev.total - 1,
                  recentVisitors: prev.recentVisitors.filter(
                    (v) => v.id !== id,
                  ),
                }
              : prev,
          );
      }
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const filtered = visitors.filter((v) => {
    const matchSearch =
      v.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      v.phone_number?.includes(search) ||
      v.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "blocked"
          ? v.is_blocked
          : !v.is_blocked;
    return matchSearch && matchStatus;
  });

  const filteredExhibitors = exhibitors.filter((e) => {
    const matchSearch =
      e.company_name?.toLowerCase().includes(exhibitorSearch.toLowerCase()) ||
      e.contact_name?.toLowerCase().includes(exhibitorSearch.toLowerCase()) ||
      e.phone?.includes(exhibitorSearch);
    const matchStatus =
      exhibitorFilter === "all" ? true : e.status === exhibitorFilter;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const blockedCount = visitors.filter((v) => v.is_blocked).length;
  const activeCount = visitors.filter((v) => !v.is_blocked).length;

  const exportCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "Status",
      "Registered At",
    ];
    const rows = filtered.map((v) => [
      v.id,
      v.full_name,
      v.phone_number,
      v.email || "",
      v.is_blocked ? "Blocked" : "Active",
      new Date(v.created_at).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "visitors.csv";
    a.click();
  };

  const navItems: {
    id: TabType;
    icon: string;
    label: string;
    count?: number;
  }[] = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    {
      id: "visitors",
      icon: "👥",
      label: "Visitor Details",
      count: visitors.length,
    },
    {
      id: "exhibitors",
      icon: "🏢",
      label: "Exhibitor Registrations",
      count: exhibitors.length || undefined,
    },
    { id: "newsletter", icon: "📰", label: "Newsletter" },
    {
      id: "videos",
      icon: "🎬",
      label: "Videos",
      count: videos.length || undefined,
    },
    {
      id: "podcasts",
      icon: "🎙️",
      label: "Podcasts",
    },
    {
      id: "images",
      icon: "🖼️",
      label: "Images",
      count: images.length || undefined,
    },
    {
      id: "content",
      icon: "📝",
      label: "Content",
      count: contents.length || undefined,
    },
  ];

  const statusColor = (status: string) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-700";
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B34]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#070B34] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="rounded-2xl border border-white/10 bg-[#0B1E5B]/90 p-6 max-w-sm w-full shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-400/20">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-1">
              Delete Visitor?
            </h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              This action is permanent and{" "}
              <span className="text-red-500 font-medium">cannot be undone</span>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50"
              >
                {deletingId === confirmDeleteId ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-300 shadow-2xl ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{
          background: "linear-gradient(180deg, #110c41 0%, #1a1560 100%)",
        }}
      >
        <div className="border-b border-white/10 px-3 py-3 flex items-center justify-between gap-2">
          <img
            src="/images/logo.jpeg"
            alt="Fusionera Logo"
            className="block object-contain flex-1 min-w-0"
            style={{ height: "52px", width: "auto", maxWidth: "100%" }}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
            }}
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white/60 hover:text-white flex-shrink-0 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? "bg-white/15 text-white" : "text-blue-200 hover:bg-white/10 hover:text-white"}`}
            >
              <span>{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {blockedCount > 0 && (
          <div className="mx-3 mb-2 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-400/20">
            <p className="text-xs text-red-300">
              🚫 {blockedCount} blocked visitor{blockedCount > 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div className="px-3 pb-5 pt-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-500/20 transition"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-white/10 bg-[#0B1E5B]/90 backdrop-blur-xl px-4 md:px-6 py-4 flex items-center justify-between gap-3 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">
                {navItems.find((n) => n.id === activeTab)?.icon}{" "}
                {navItems.find((n) => n.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <button
            onClick={fetchData}
            title="Refresh"
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && stats && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  {
                    icon: "👥",
                    label: "Total Visitors",
                    value: stats.total,
                    bg: "#ede9fe",
                  },
                  {
                    icon: "✅",
                    label: "Active",
                    value: activeCount,
                    bg: "#d1fae5",
                  },
                  {
                    icon: "🚫",
                    label: "Blocked",
                    value: blockedCount,
                    bg: "#fee2e2",
                  },
                  {
                    icon: "📅",
                    label: "Today",
                    value: stats.today,
                    bg: "#dbeafe",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 shadow-[0_0_30px_rgba(0,0,0,0.22)] backdrop-blur-xl flex items-center gap-3"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: card.bg }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{card.label}</p>
                      <p className="text-2xl font-bold text-white">
                        {card.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <h3 className="font-bold text-white">
                    🕐 Recent Registrations
                  </h3>
                  <button
                    onClick={() => setActiveTab("visitors")}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    View all →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead className="bg-white/5">
                      <tr>
                        {["Name", "Phone", "Email", "Status", "Actions"].map(
                          (h) => (
                            <th
                              key={h}
                              className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentVisitors.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="py-10 text-center text-gray-400 text-sm"
                          >
                            No registrations yet
                          </td>
                        </tr>
                      ) : (
                        stats.recentVisitors.map((v) => (
                          <tr
                            key={v.id}
                            className={`border-t border-white/10 ${v.is_blocked ? "bg-red-500/10" : "hover:bg-white/5"}`}
                          >
                            <td className="py-3 px-4 font-medium text-white">
                              {v.full_name}
                            </td>
                            <td className="py-3 px-4 text-gray-300 text-xs">
                              {v.phone_number}
                            </td>
                            <td className="py-3 px-4 text-gray-400 text-xs">
                              {v.email || "—"}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${v.is_blocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                              >
                                {v.is_blocked ? "🚫 Blocked" : "✅ Active"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => toggleBlock(v)}
                                  disabled={blockingId === v.id}
                                  className={`px-2.5 py-1.5 text-xs rounded-lg font-medium transition disabled:opacity-50 ${v.is_blocked ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`}
                                >
                                  {blockingId === v.id
                                    ? "..."
                                    : v.is_blocked
                                      ? "✅ Unblock"
                                      : "🚫 Block"}
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(v.id)}
                                  className="px-2.5 py-1.5 text-xs rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition font-medium"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── VISITORS ── */}
          {activeTab === "visitors" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      🔍
                    </span>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Search name, phone, email..."
                      className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <button
                    onClick={exportCSV}
                    className="px-4 py-2.5 text-sm rounded-xl text-white font-medium hover:opacity-90 flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                    }}
                  >
                    📥 <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                  {[
                    { id: "all", label: `All (${visitors.length})` },
                    { id: "active", label: `✅ Active (${activeCount})` },
                    { id: "blocked", label: `🚫 Blocked (${blockedCount})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFilterStatus(f.id as "all" | "active" | "blocked");
                        setPage(1);
                      }}
                      className={`px-3 py-2 text-xs rounded-xl font-medium transition ${filterStatus === f.id ? "bg-indigo-600 text-white" : "border border-white/10 bg-white/10 text-gray-300 hover:bg-white/15"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                  <span className="text-xs text-gray-400 ml-auto">
                    {filtered.length} results
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        {[
                          "#",
                          "Full Name",
                          "Phone",
                          "Email",
                          "Status",
                          "Registered",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left py-3.5 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="py-16 text-center text-gray-400"
                          >
                            <p className="text-4xl mb-2">🔍</p>
                            <p className="font-medium">No visitors found</p>
                          </td>
                        </tr>
                      ) : (
                        paginated.map((v, i) => (
                          <tr
                            key={v.id}
                            className={`border-t border-white/10 transition ${v.is_blocked ? "bg-red-500/10" : "hover:bg-[#070B34]"}`}
                          >
                            <td className="py-3.5 px-4 text-gray-400 text-xs font-mono">
                              {(page - 1) * PER_PAGE + i + 1}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {v.full_name}
                            </td>
                            <td className="py-3.5 px-4">
                              <a
                                href={`tel:${v.phone_number}`}
                                className="text-indigo-400 hover:text-indigo-300 font-medium"
                              >
                                {v.phone_number}
                              </a>
                            </td>
                            <td className="py-3.5 px-4 text-gray-400 text-xs">
                              {v.email || (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${v.is_blocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                              >
                                {v.is_blocked ? "🚫 Blocked" : "✅ Active"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-gray-400 whitespace-nowrap">
                              {new Date(v.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => toggleBlock(v)}
                                  disabled={blockingId === v.id}
                                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition disabled:opacity-50 border ${v.is_blocked ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"}`}
                                >
                                  {blockingId === v.id
                                    ? "..."
                                    : v.is_blocked
                                      ? "✅ Unblock"
                                      : "🚫 Block"}
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(v.id)}
                                  className="px-3 py-1.5 text-xs rounded-lg font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-400">
                      Showing {(page - 1) * PER_PAGE + 1}–
                      {Math.min(page * PER_PAGE, filtered.length)} of{" "}
                      {filtered.length}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-40"
                      >
                        ← Prev
                      </button>
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const p =
                            Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                          return (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`px-3 py-1.5 text-xs rounded-lg ${p === page ? "bg-indigo-600 text-white" : "border border-white/10 text-gray-300 hover:bg-white/10"}`}
                            >
                              {p}
                            </button>
                          );
                        },
                      )}
                      <button
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-40"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── EXHIBITOR REGISTRATIONS ── */}
          {activeTab === "exhibitors" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                  <input
                    type="text"
                    value={exhibitorSearch}
                    onChange={(e) => setExhibitorSearch(e.target.value)}
                    placeholder="Search company, name, phone..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["all", "pending", "approved", "rejected"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setExhibitorFilter(f)}
                      className={`px-3 py-2 text-xs rounded-xl font-medium transition capitalize ${exhibitorFilter === f ? "bg-indigo-600 text-white" : "border border-white/10 bg-white/10 text-gray-300 hover:bg-white/15"}`}
                    >
                      {f === "all" ? `All (${exhibitors.length})` : f}
                    </button>
                  ))}
                </div>
              </div>

              {exhibitorLoading ? (
                <div className="py-20 text-center text-gray-400">
                  <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
                  Loading...
                </div>
              ) : filteredExhibitors.length === 0 ? (
                <div className="py-20 text-center text-gray-400 rounded-2xl border border-white/10 bg-white/5">
                  <p className="text-4xl mb-2">🏢</p>
                  <p className="font-medium">No exhibitor registrations yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredExhibitors.map((e) => (
                    <div
                      key={e.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur-xl"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-white font-bold text-base">
                              {e.company_name || "—"}
                            </h3>
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${statusColor(e.status)}`}
                            >
                              {e.status}
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 text-sm">
                            <span className="text-gray-300">
                              👤 {e.contact_name || "—"}
                            </span>
                            <span className="text-gray-300">
                              📞 {e.phone || "—"}
                            </span>
                            <span className="text-gray-300">
                              📧 {e.email || "—"}
                            </span>
                            <span className="text-gray-300">
                              🏙️ {e.city || "—"}
                            </span>
                            <span className="text-gray-300">
                              📦 {e.product_category || "—"}
                            </span>
                            <span className="text-gray-300">
                              🏷️ {e.stall_type || "—"}
                            </span>
                          </div>
                          {e.message && (
                            <p className="mt-2 text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-2">
                              {e.message}
                            </p>
                          )}
                          <p className="mt-2 text-xs text-gray-500">
                            {new Date(e.created_at).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateExhibitorStatus(e.id, "approved")
                              }
                              className="px-3 py-1.5 text-xs rounded-lg bg-green-100 text-green-700 hover:bg-green-200 font-semibold transition"
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() =>
                                updateExhibitorStatus(e.id, "rejected")
                              }
                              className="px-3 py-1.5 text-xs rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-semibold transition"
                            >
                              ❌ Reject
                            </button>
                          </div>
                          <button
                            onClick={() => deleteExhibitor(e.id)}
                            className="px-3 py-1.5 text-xs rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 font-medium transition text-center"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── NEWSLETTER ── */}
          {activeTab === "newsletter" && (
            <div className="space-y-4 max-w-2xl">
              <div className="rounded-2xl overflow-hidden shadow border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                  <h2 className="text-lg font-bold text-white">
                    📰 Newsletter Editor
                  </h2>
                  <p className="text-xs mt-0.5 text-gray-400">
                    Publish toggle on karne se visitors ko dikhega.
                  </p>
                </div>
                <div className="px-6 py-6 space-y-4">
                  {nlSaved && (
                    <div className="rounded-xl px-4 py-3 text-sm text-green-700 bg-green-50 border border-green-200">
                      ✅ Newsletter saved successfully!
                    </div>
                  )}
                  {[
                    {
                      label: "Title",
                      val: nlTitle,
                      set: setNlTitle,
                      ph: "Newsletter title...",
                    },
                    {
                      label: "Subtitle",
                      val: nlSubtitle,
                      set: setNlSubtitle,
                      ph: "Short description...",
                    },
                  ].map(({ label, val, set, ph }) => (
                    <div key={label}>
                      <label className="block text-sm font-semibold mb-1.5 text-white">
                        {label}
                      </label>
                      <input
                        value={val}
                        onChange={(e) => set(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 border border-white/10 text-white placeholder-gray-400"
                        placeholder={ph}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-white">
                      Content
                    </label>
                    <textarea
                      value={nlContent}
                      onChange={(e) => setNlContent(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white/10 border border-white/10 text-white placeholder-gray-400"
                      placeholder="Newsletter ka content yahan likho..."
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => setNlPublished((p) => !p)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${nlPublished ? "bg-blue-600" : "bg-white/20"}`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${nlPublished ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {nlPublished
                        ? "Published — visitors ko dikh raha hai"
                        : "Unpublished — visitors ko nahi dikhega"}
                    </span>
                  </div>
                  <button
                    onClick={saveNewsletter}
                    disabled={nlLoading}
                    className="w-full py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                    }}
                  >
                    {nlLoading ? "Saving..." : "Save Newsletter"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── VIDEOS ── */}
          {activeTab === "videos" && (
            <div className="space-y-5">
              {/* Add/Edit Form */}
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <h3 className="text-white font-bold mb-4">
                  {editingVideo ? "✏️ Edit Video" : "➕ Add New Video"}
                </h3>
                {videoSaved && (
                  <div className="mb-3 rounded-xl px-4 py-3 text-sm text-green-700 bg-green-50 border border-green-200">
                    ✅ Video saved!
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Title *
                    </label>
                    <input
                      value={videoForm.title}
                      onChange={(e) =>
                        setVideoForm((f) => ({ ...f, title: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Video title..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      YouTube URL *
                    </label>
                    <input
                      value={videoForm.url}
                      onChange={(e) =>
                        setVideoForm((f) => ({ ...f, url: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Category
                    </label>
                    <select
                      value={videoForm.category}
                      onChange={(e) =>
                        setVideoForm((f) => ({
                          ...f,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[
                        "general",
                        "exhibition",
                        "products",
                        "testimonials",
                        "highlights",
                      ].map((c) => (
                        <option key={c} value={c} className="bg-[#0B1E5B]">
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <div
                      onClick={() =>
                        setVideoForm((f) => ({
                          ...f,
                          is_published: !f.is_published,
                        }))
                      }
                      className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${videoForm.is_published ? "bg-blue-600" : "bg-white/20"}`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${videoForm.is_published ? "translate-x-5" : "translate-x-0.5"}`}
                      />
                    </div>
                    <span className="text-sm text-gray-300">
                      {videoForm.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={saveVideo}
                    disabled={
                      videoLoading || !videoForm.title || !videoForm.url
                    }
                    className="px-6 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition"
                    style={{
                      background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                    }}
                  >
                    {videoLoading
                      ? "Saving..."
                      : editingVideo
                        ? "Update Video"
                        : "Add Video"}
                  </button>
                  {editingVideo && (
                    <button
                      onClick={() => {
                        setEditingVideo(null);
                        setVideoForm({
                          title: "",
                          url: "",
                          category: "general",
                          is_published: true,
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Videos List */}
              {videoLoading && !videos.length ? (
                <div className="py-20 text-center text-gray-400">
                  <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
                  Loading...
                </div>
              ) : videos.length === 0 ? (
                <div className="py-20 text-center text-gray-400 rounded-2xl border border-white/10 bg-white/5">
                  <p className="text-4xl mb-2">🎬</p>
                  <p className="font-medium">No videos added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((v) => {
                    const ytId = getYouTubeId(v.url);
                    return (
                      <div
                        key={v.id}
                        className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                      >
                        <div className="relative">
                          {ytId ? (
                            <img
                              src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                              alt={v.title}
                              className="w-full h-36 object-cover"
                            />
                          ) : (
                            <div className="w-full h-36 bg-white/10 flex items-center justify-center text-gray-400">
                              🎬
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                            >
                              {v.is_published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <div className="absolute top-2 left-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-black/60 text-white capitalize">
                              {v.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-white text-sm font-semibold truncate">
                            {v.title}
                          </p>
                          <p className="text-gray-400 text-xs truncate mt-0.5">
                            {v.url}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => {
                                setEditingVideo(v);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="flex-1 py-1.5 text-xs rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition font-medium"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => deleteVideo(v.id)}
                              className="flex-1 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition font-medium"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {/* ── IMAGES ── */}
          {activeTab === "images" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <h3 className="text-white font-bold mb-4">{editingImage ? "✏️ Edit Image" : "➕ Add New Image"}</h3>
                {imageSaved && (
                  <div className="mb-3 rounded-xl px-4 py-3 text-sm text-green-700 bg-green-50 border border-green-200">
                    ✅ Image saved!
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Title
                    </label>
                    <input
                      value={imageForm.title}
                      onChange={(e) =>
                        setImageForm((f) => ({ ...f, title: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                      placeholder="Image title..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Image URL *
                    </label>
                    <input
                      value={imageForm.url}
                      onChange={(e) =>
                        setImageForm((f) => ({ ...f, url: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Category
                    </label>
                    <select
                      value={imageForm.category}
                      onChange={(e) =>
                        setImageForm((f) => ({
                          ...f,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white focus:outline-none"
                    >
                      {[
                        "general",
                        "exhibition",
                        "products",
                        "venue",
                        "team",
                      ].map((c) => (
                        <option key={c} value={c} className="bg-[#0B1E5B]">
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Type
                    </label>
                    <select
                      value={imageForm.type}
                      onChange={(e) =>
                        setImageForm((f) => ({ ...f, type: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white focus:outline-none"
                    >
                      {["gallery", "catalogue", "banner", "slider"].map((t) => (
                        <option key={t} value={t} className="bg-[#0B1E5B]">
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div
                    onClick={() =>
                      setImageForm((f) => ({
                        ...f,
                        is_published: !f.is_published,
                      }))
                    }
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${imageForm.is_published ? "bg-blue-600" : "bg-white/20"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${imageForm.is_published ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    {imageForm.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={saveImage}
                    disabled={imageLoading || !imageForm.url}
                    className="px-6 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition"
                    style={{ background: "#E8274B" }}
                  >
                    {imageLoading ? "Saving..." : editingImage ? "Update Image" : "Add Image"}
                  </button>
                  {editingImage && (
                    <button
                      onClick={() => {
                        setEditingImage(null);
                        setImageForm({ title: "", url: "", category: "general", type: "gallery", is_published: true });
                      }}
                      className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {imageLoading && !images.length ? (
                <div className="py-20 text-center text-gray-400">
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  Loading...
                </div>
              ) : images.length === 0 ? (
                <div className="py-20 text-center text-gray-400 rounded-2xl border border-white/10 bg-white/5">
                  <p className="text-4xl mb-2">🖼️</p>
                  <p className="font-medium">No images added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "";
                        }}
                      />
                      <div className="p-2">
                        <p className="text-white text-xs font-semibold truncate">
                          {img.title || "—"}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-400 capitalize">
                            {img.type}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setEditingImage(img);
                                setImageForm({ title: img.title, url: img.url, category: img.category, type: img.type, is_published: img.is_published });
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="text-xs text-indigo-400 hover:text-indigo-300 px-1"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteImage(img.id)}
                              className="text-xs text-red-400 hover:text-red-300 px-1"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── CONTENT ── */}
          {activeTab === "content" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <h3 className="text-white font-bold mb-4">➕ Add / Update Content</h3>
                {contentSaved && <div className="mb-3 rounded-xl px-4 py-3 text-sm text-green-700 bg-green-50 border border-green-200">✅ Content saved!</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">Key * (unique identifier)</label>
                    <select value={contentForm.key} onChange={(e) => setContentForm((f) => ({ ...f, key: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white focus:outline-none">
                      <option value="" className="bg-[#0B1E5B]">Select content type...</option>
                      {["about_us", "announcement", "banner_main", "banner_secondary", "hero_title", "hero_subtitle", "footer_text", "contact_info"].map((k) => (
                        <option key={k} value={k} className="bg-[#0B1E5B]">{k.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">Title *</label>
                    <input value={contentForm.title} onChange={(e) => setContentForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none" placeholder="Title..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">Subtitle</label>
                    <input value={contentForm.subtitle} onChange={(e) => setContentForm((f) => ({ ...f, subtitle: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none" placeholder="Subtitle..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">Image URL</label>
                    <input value={contentForm.image_url} onChange={(e) => setContentForm((f) => ({ ...f, image_url: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none" placeholder="https://..." />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-semibold mb-1 text-gray-300">Content</label>
                  <textarea value={contentForm.content} onChange={(e) => setContentForm((f) => ({ ...f, content: e.target.value }))} rows={5} className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none resize-none" placeholder="Content text..." />
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div onClick={() => setContentForm((f) => ({ ...f, is_published: !f.is_published }))} className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${contentForm.is_published ? "bg-blue-600" : "bg-white/20"}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${contentForm.is_published ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm text-gray-300">{contentForm.is_published ? "Published" : "Draft"}</span>
                </div>
                <button onClick={saveContent} disabled={contentLoading || !contentForm.key || !contentForm.title} className="mt-4 px-6 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition" style={{ background: "#E8274B" }}>
                  {contentLoading ? "Saving..." : "Save Content"}
                </button>
              </div>

              {contentLoading && !contents.length ? (
                <div className="py-20 text-center text-gray-400"><div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3" />Loading...</div>
              ) : contents.length === 0 ? (
                <div className="py-20 text-center text-gray-400 rounded-2xl border border-white/10 bg-white/5"><p className="text-4xl mb-2">📝</p><p className="font-medium">No content added yet</p></div>
              ) : (
                <div className="space-y-3">
                  {contents.map((c) => (
                    <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: "#F4822A" }}>{c.key.replace(/_/g, " ")}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{c.is_published ? "Published" : "Draft"}</span>
                          </div>
                          <p className="text-white font-semibold">{c.title}</p>
                          {c.subtitle && <p className="text-gray-400 text-sm">{c.subtitle}</p>}
                          {c.content && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{c.content}</p>}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => setContentForm({ key: c.key, title: c.title, subtitle: c.subtitle, content: c.content, image_url: c.image_url, is_published: c.is_published })} className="px-3 py-1.5 text-xs rounded-lg text-white font-medium" style={{ background: "#E8274B" }}>✏️ Edit</button>
                          <button onClick={() => deleteContent(c.id)} className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── PODCASTS ── */}
          {activeTab === "podcasts" && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <h3 className="text-white font-bold mb-4">
                  {editingPodcast ? "✏️ Edit Podcast" : "➕ Add New Podcast"}
                </h3>
                {podcastSaved && (
                  <div className="mb-3 rounded-xl px-4 py-3 text-sm text-green-700 bg-green-50 border border-green-200">
                    ✅ Podcast saved!
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Title *
                    </label>
                    <input
                      value={podcastForm.title}
                      onChange={(e) =>
                        setPodcastForm((f) => ({ ...f, title: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                      placeholder="Episode title..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      URL * (YouTube/Spotify)
                    </label>
                    <input
                      value={podcastForm.url}
                      onChange={(e) =>
                        setPodcastForm((f) => ({ ...f, url: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Description
                    </label>
                    <input
                      value={podcastForm.description}
                      onChange={(e) =>
                        setPodcastForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                      placeholder="Short description..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-300">
                      Platform
                    </label>
                    <select
                      value={podcastForm.platform}
                      onChange={(e) =>
                        setPodcastForm((f) => ({
                          ...f,
                          platform: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white focus:outline-none"
                    >
                      {["youtube", "spotify", "other"].map((p) => (
                        <option key={p} value={p} className="bg-[#0B1E5B]">
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div
                    onClick={() =>
                      setPodcastForm((f) => ({
                        ...f,
                        is_published: !f.is_published,
                      }))
                    }
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${podcastForm.is_published ? "bg-blue-600" : "bg-white/20"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${podcastForm.is_published ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                  </div>
                  <span className="text-sm text-gray-300">
                    {podcastForm.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={savePodcast}
                    disabled={
                      podcastLoading || !podcastForm.title || !podcastForm.url
                    }
                    className="px-6 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition"
                    style={{ background: "#E8274B" }}
                  >
                    {podcastLoading
                      ? "Saving..."
                      : editingPodcast
                        ? "Update"
                        : "Add Podcast"}
                  </button>
                  {editingPodcast && (
                    <button
                      onClick={() => {
                        setEditingPodcast(null);
                        setPodcastForm({
                          title: "",
                          description: "",
                          url: "",
                          platform: "youtube",
                          is_published: true,
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {podcastLoading && !podcasts.length ? (
                <div className="py-20 text-center text-gray-400">
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  Loading...
                </div>
              ) : podcasts.length === 0 ? (
                <div className="py-20 text-center text-gray-400 rounded-2xl border border-white/10 bg-white/5">
                  <p className="text-4xl mb-2">🎙️</p>
                  <p className="font-medium">No podcasts added yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {podcasts.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="text-white font-semibold truncate">
                            {p.title}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${p.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                          >
                            {p.is_published ? "Published" : "Draft"}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full text-white capitalize"
                            style={{ background: "#F4822A" }}
                          >
                            {p.platform}
                          </span>
                        </div>
                        {p.description && (
                          <p className="text-gray-400 text-xs truncate">
                            {p.description}
                          </p>
                        )}
                        <p className="text-gray-500 text-xs truncate mt-0.5">
                          {p.url}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingPodcast(p);
                            setPodcastForm({
                              title: p.title,
                              description: p.description,
                              url: p.url,
                              platform: p.platform,
                              is_published: p.is_published,
                            });
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-3 py-1.5 text-xs rounded-lg text-white font-medium"
                          style={{ background: "#E8274B" }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deletePodcast(p.id)}
                          className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition font-medium"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
