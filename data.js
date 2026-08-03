/* ===========================================================
   SAGAR CONSTRUCTION CO. — PROJECT REGISTER
   Note: locations/sizes inferred where the source list didn't
   specify them — swap in exact figures whenever you have them.
   "size" = built-up area in sq ft (not a currency value).
=========================================================== */

const PROJECTS = [
  { name: "Panchratna", area: "Opera House", year: 1971, size: "4,00,000 sq ft", status: "completed", flagship: true, note: "The firm's founding and flagship project — where it all started, in 1971.", photo: "panchratna.jpg" },
  { name: "Ridge Apartments", area: "Malabar Hill", year: 1975, size: "40,000 sq ft", status: "completed", note: "One of the firm's early landmark residential blocks, following soon after Panchratna.", photo: "ridge.jpg" },
  { name: "Odeon Theatre", area: "Girgaon", year: 1972, size: "20,000 sq ft", status: "completed", note: "A single-screen landmark built for the neighbourhood." },
  { name: "Odeon Apartments", area: "Girgaon", year: 1973, size: "30,000 sq ft", status: "completed", note: "Residential block raised beside the theatre, shops at street level.", photo: "odeon.jpg" },
  { name: "Vellard View", area: "Mahim", year: 1977, size: "50,000 sq ft", status: "completed", note: "Named for the old Mahim causeway it overlooks." },
  { name: "Rajnigandha Apartments", area: "New Panvel", year: 1988, size: "30,000 sq ft", status: "completed", note: "Part of our early push into the growing Panvel node." },
  { name: "Abhilash", area: "Chembur", year: 1988, size: "20,000 sq ft", status: "completed", note: "Built in the late-80s Chembur residential boom." },
  { name: "Vora Apartments", area: "Ghatkopar", year: 1979, size: "20,000 sq ft", status: "completed", note: "One of two sister blocks raised in Ghatkopar." },
  { name: "Arihant Apartments", area: "Ghatkopar", year: 1979, size: "15,000 sq ft", status: "completed", note: "Delivered alongside Vora Apartments in the same locality." },
  { name: "Pleasant Park", area: "Mumbai", year: 1995, size: "1,50,000 sq ft", status: "completed", note: "A green-courtyard residential enclave.", photo: "pleasant-park.jpg" },
  { name: "Prerna Apartments", area: "Mumbai", year: 2000, size: "15,000 sq ft", status: "completed", note: "Compact, efficient family housing." },
  { name: "Abhinav Apartments I", area: "New Panvel", year: 2002, size: "15,000 sq ft", status: "completed", note: "First of two Abhinav blocks on the same panel of land." },
  { name: "Abhinav Apartments II", area: "New Panvel", year: 2002, size: "15,000 sq ft", status: "completed", note: "Sister building to Abhinav I, completed the same year." },
  { name: "Utsav Apartments", area: "Panvel", year: 2002, size: "15,000 sq ft", status: "completed", note: "Festive-themed residential development." },
  { name: "Lonavala Villas", area: "Lonavala", year: 2010, size: "40,000 sq ft", status: "completed", note: "Our first hill-station project — weekend villas in the Sahyadris." },
  { name: "Raj Vihar", area: "Mumbai", year: 2024, size: "30,000 sq ft", status: "completed", jv: true, note: "Completed in 2024, developed in joint venture — part of the firm's ongoing Mumbai portfolio.", photo: "raj-vihar.jpg" },
  { name: "Emperia C2", area: "Mumbai", year: 2026, size: "12,50,000 sq ft", status: "ongoing", jv: true, completionTarget: "Dec 2028", note: "Our flagship current development, delivered in joint venture — the largest project in company history, targeted for completion by December 2028.", photo: "emperia-c2.jpg" },
];

const PARTNERS = [
  { name: "Shri Pankaj Gupta", role: "Partner", photo: null, bio: "Part of the current generation of leadership carrying the firm's projects forward across Mumbai." },
  { name: "Shri Abhinav Gupta", role: "Partner", photo: "abhinav-gupta.jpg", bio: "Part of the current generation of leadership carrying the firm's projects forward across Mumbai." },
  { name: "Shri Abhilash Gupta", role: "Partner", photo: null, bio: "Part of the current generation of leadership carrying the firm's projects forward across Mumbai." },
];

function sqftToNumber(str) {
  // Converts an Indian-format "12,50,000 sq ft" style string to a plain number
  return parseInt(String(str).replace(/[^\d]/g, ""), 10) || 0;
}

const STATS = {
  founded: 1971,
  yearsActive: new Date().getFullYear() - 1971,
  completed: PROJECTS.filter(p => p.status === "completed").length,
  ongoing: PROJECTS.filter(p => p.status === "ongoing").length,
  localities: [...new Set(PROJECTS.map(p => p.area))].length,
  totalSqft: PROJECTS.reduce((sum, p) => sum + sqftToNumber(p.size), 0),
};
