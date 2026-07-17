const anonymousStudent = {
  id: null,
  username: "Anonymous Student",
  email: "",
  role: "Student"
};

export function maskAnonymousComplaint(complaint, viewerRole) {
  if (!complaint || !complaint.is_anonymous || viewerRole === "Student") return complaint;
  return {
    ...complaint,
    student: anonymousStudent
  };
}

export function anonymousStudentLabel(complaint, fallback = "Student") {
  if (complaint?.is_anonymous) return "Anonymous Student";
  return complaint?.student?.username || fallback;
}
