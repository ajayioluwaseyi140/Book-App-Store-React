import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FiCamera, FiPhone, FiUser, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import { storeContext } from "../context/storeContext";

function Profile() {
  const { apiUrl, token } = useContext(storeContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ fullName: "", bio: "", phoneNumber: "" });
  const fileInputRef = useRef(null);

  const getProfile = useCallback(async () => {
    setError("");
    try {
      const response = await fetch(`${apiUrl}/profile/single`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not load your profile.");

      const nextProfile = data.profile ?? data;
      setProfile(nextProfile);
      setForm((current) => ({
        fullName: nextProfile.fullName ?? current.fullName,
        bio: nextProfile.bio ?? current.bio,
        phoneNumber: nextProfile.phoneNumber ?? current.phoneNumber,
      }));
    } catch (requestError) {
      setError(requestError.message || "Could not load your profile.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, token]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  async function saveProfile(event) {
    event.preventDefault();
    if (!form.fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${apiUrl}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          bio: form.bio.trim(),
          phoneNumber: form.phoneNumber.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not update your profile.");
      if (data.profile) {
        setProfile((current) => ({ ...current, ...data.profile }));
        setForm({
          fullName: data.profile.fullName ?? form.fullName,
          bio: data.profile.bio ?? form.bio,
          phoneNumber: data.profile.phoneNumber ?? form.phoneNumber,
        });
      }
      toast.success(data.message || "Profile updated successfully.");
    } catch (updateError) {
      toast.error(updateError.message || "Could not update your profile.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadAvatar(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file to upload.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const response = await fetch(`${apiUrl}/profile/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Avatar upload failed.");
      toast.success(data.message || "Profile photo updated.");
      setAvatarFailed(false);
      await getProfile();
    } catch (uploadError) {
      toast.error(uploadError.message || "Avatar upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  const avatarPath = typeof profile?.avatar === "string"
    ? profile.avatar.replaceAll("\\", "/")
    : "";
  const avatarFilename = avatarPath.split("/").pop();
  const avatarUrl = avatarPath
    ? /^https?:\/\//i.test(avatarPath)
      ? avatarPath
      : `${apiUrl.replace(/\/$/, "")}/${avatarPath.replace(/^\/?public\//, "")}`
    : "";
  const displayName = form.fullName || profile?.fullName || "Book lover";
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#f7f5f0] px-4 pt-28">
        <div className="mx-auto max-w-4xl animate-pulse rounded-3xl bg-white p-8 shadow-sm">
          <div className="h-7 w-48 rounded bg-stone-200" />
          <div className="mt-8 flex items-center gap-5">
            <div className="h-24 w-24 rounded-full bg-stone-200" />
            <div className="space-y-3"><div className="h-5 w-40 rounded bg-stone-200" /><div className="h-4 w-56 rounded bg-stone-100" /></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[70vh] bg-[#f7f5f0] px-4 pt-28">
        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Your profile</h1>
          <p className="mt-3 text-stone-600">{error}</p>
          <button onClick={() => { setLoading(true); getProfile(); }} className="mt-6 rounded-xl bg-stone-900 px-5 py-3 font-medium text-white transition hover:bg-stone-700">Try again</button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#f7f5f0] px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">Your account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Profile</h1>
          <p className="mt-2 text-stone-600">Manage your personal details and profile photo.</p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_18px_55px_-35px_rgba(28,25,23,0.35)]">
          <div className="h-32 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 sm:h-40" />
          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-5">
                <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white bg-amber-100 text-2xl font-semibold text-amber-900 shadow-md sm:h-28 sm:w-28">
                  {avatarUrl && !avatarFailed ? (
                    <img src={avatarUrl} alt={`${displayName}'s profile`} className="h-full w-full object-cover" onError={() => setAvatarFailed(true)} />
                  ) : (
                    <span>{initials || <FiUser />}</span>
                  )}
                </div>
                <div className="pb-1">
                  <h2 className="text-2xl font-semibold text-stone-900">{displayName}</h2>
                  <p className="mt-1 text-sm text-stone-500">Reader account</p>
                </div>
              </div>

              <div>
                <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={uploadAvatar} />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-60"
                >
                  {uploading ? <FiUploadCloud className="animate-pulse" /> : <FiCamera />}
                  {uploading ? "Uploading photo..." : "Change photo"}
                </button>
              </div>
            </div>

            <div className="mt-9 border-t border-stone-100 pt-7">
              <h3 className="text-lg font-semibold text-stone-900">Personal information</h3>
              <p className="mt-1 text-sm text-stone-500">Update the details shown on your reader profile.</p>

              <form onSubmit={saveProfile} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Full name
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                      maxLength={100}
                      required
                      placeholder="Your full name"
                      className="mt-2 block w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
                    />
                  </label>
                  <label className="block text-sm font-medium text-stone-700">
                    <span className="flex items-center gap-2"><FiPhone /> Phone number</span>
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })}
                      placeholder="Add a phone number"
                      className="mt-2 block w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
                    />
                  </label>
                </div>
                <label className="block text-sm font-medium text-stone-700">
                  About me
                  <textarea
                    value={form.bio}
                    onChange={(event) => setForm({ ...form, bio: event.target.value })}
                    rows={4}
                    maxLength={500}
                    placeholder="Tell us a little about the books you enjoy..."
                    className="mt-2 block w-full resize-y rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
                  />
                  <span className="mt-1 block text-right text-xs font-normal text-stone-400">{form.bio.length}/500</span>
                </label>
                <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-stone-400">Your profile photo and details are saved to your account.</p>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-amber-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:cursor-wait disabled:opacity-60"
                  >
                    {saving ? "Saving changes..." : "Save changes"}
                  </button>
                </div>
              </form>
              {avatarFilename && (
                <p className="mt-5 text-xs text-stone-400">Photo file: {avatarFilename}</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
