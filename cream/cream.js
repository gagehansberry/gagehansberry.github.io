// Cream product page. Runs entirely in the browser and sends nothing anywhere.
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal, and the strike-through on "what Cream doesn't do".
  var observer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
    });
  }, { threshold: 0.18 }) : null;
  document.querySelectorAll(".reveal, .nots li").forEach(function (el, i) {
    if (el.matches(".nots li")) el.style.transitionDelay = (i % 6) * 0.12 + "s";
    if (observer) observer.observe(el); else el.classList.add("in");
  });
  document.querySelectorAll(".nots li span").forEach(function (s, i) { s.style.transitionDelay = 0.25 + i * 0.18 + "s"; });

  // Hero video: respect reduced motion by not autoplaying.
  var video = document.querySelector(".hero-video video");
  if (video && reduceMotion) { video.removeAttribute("autoplay"); video.pause(); video.setAttribute("controls", ""); }

  // "Try the daily number": the same arithmetic as the app's
  // Left to Spend, Per Day: (expected income - spent - bills still due) / days left, counting today.
  var money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  var form = document.getElementById("demo");
  if (form) {
    var income = form.querySelector("#income");
    var spent = form.querySelector("#spent");
    var bills = form.querySelector("#bills");
    var days = form.querySelector("#days");
    var daysOut = form.querySelector("#days-out");
    var perDay = document.getElementById("per-day");
    var explain = document.getElementById("explain");
    var leftText = document.getElementById("g-left");
    var ofText = document.getElementById("g-of");
    var arcFree = document.getElementById("arc-free");
    var arcBills = document.getElementById("arc-bills");

    // Default the days slider to what's actually left in this month.
    var now = new Date();
    var monthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    days.max = String(monthDays);
    days.value = String(monthDays - now.getDate() + 1);
    var monthName = now.toLocaleString("en-US", { month: "long" });

    var num = function (input) {
      var v = parseFloat(String(input.value).replace(/[^0-9.]/g, ""));
      return isFinite(v) && v > 0 ? Math.round(v * 100) / 100 : 0;
    };

    var update = function () {
      var inc = num(income), sp = num(spent), bi = num(bills), d = parseInt(days.value, 10) || 1;
      daysOut.textContent = d + (d === 1 ? " day" : " days");
      var left = Math.round((inc - sp) * 100) / 100;
      var free = Math.round((left - bi) * 100) / 100;
      var daily = free > 0 ? Math.round((free / d) * 100) / 100 : 0;
      perDay.textContent = money.format(daily);
      if (inc <= 0) {
        explain.textContent = "Enter what you expect to earn this month.";
      } else if (free <= 0) {
        explain.textContent = "What's left doesn't cover the bills still due, so there's nothing left to spend per day.";
      } else {
        explain.textContent = money.format(free) + " left after " + money.format(bi) + " of bills still due ÷ " +
          d + (d === 1 ? " day" : " days") + " left in " + monthName + ".";
      }
      leftText.textContent = money.format(Math.max(left, 0));
      ofText.textContent = "of " + money.format(inc) + " expected";
      var pctLeft = inc > 0 ? Math.max(0, Math.min(1, left / inc)) * 100 : 0;
      var pctFree = inc > 0 ? Math.max(0, Math.min(1, free / inc)) * 100 : 0;
      arcBills.setAttribute("stroke-dasharray", pctLeft.toFixed(2) + " 100");
      arcFree.setAttribute("stroke-dasharray", pctFree.toFixed(2) + " 100");
      arcBills.style.opacity = pctLeft > 0 ? 1 : 0;
      arcFree.style.opacity = pctFree > 0 ? 1 : 0;
    };
    form.addEventListener("input", update);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    update();
  }

  // Light / dark comparison slider.
  var compare = document.querySelector(".compare");
  if (compare) {
    var range = compare.querySelector("input");
    var dark = compare.querySelector(".dark");
    var handle = compare.querySelector(".handle");
    var set = function (v) {
      dark.style.clipPath = "inset(0 0 0 " + v + "%)";
      handle.style.left = v + "%";
    };
    range.addEventListener("input", function () { set(range.value); });
    set(range.value);
  }
})();
