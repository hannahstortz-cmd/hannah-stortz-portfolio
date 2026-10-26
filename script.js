// USER-FLOW POPUP
const flowDialog = document.querySelector("#flow-dialog");
const openFlowButton = document.querySelector("#open-flow");
const closeFlowButton = document.querySelector("#close-flow");

if (flowDialog && openFlowButton && closeFlowButton) {
  openFlowButton.addEventListener("click", () => {
    flowDialog.showModal();
    document.body.classList.add("modal-open");
  });

  closeFlowButton.addEventListener("click", () => {
    flowDialog.close();
  });

  flowDialog.addEventListener("click", (event) => {
    if (event.target === flowDialog) {
      flowDialog.close();
    }
  });

  flowDialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    openFlowButton.focus();
  });
}

// WORK DROPDOWN
const workDropdown = document.querySelector(".work-dropdown");
const workToggle = workDropdown?.querySelector(".work-toggle");
const workMenu = workDropdown?.querySelector(".work-menu");

if (workDropdown && workToggle && workMenu) {
  let lastPointerType = "";
  const mobileWorkLayout = window.matchMedia("(max-width: 900px)");

  function setWorkOpen(open) {
    workDropdown.classList.toggle("is-open", open);
    workToggle.setAttribute("aria-expanded", String(open));
    workMenu.inert = !open;
  }

  setWorkOpen(false);

  workDropdown.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && !mobileWorkLayout.matches) {
      setWorkOpen(true);
    }
  });

  workDropdown.addEventListener("pointerleave", (event) => {
    if (
      !mobileWorkLayout.matches &&
      event.pointerType === "mouse" &&
      !workDropdown.contains(document.activeElement)
    ) {
      setWorkOpen(false);
    }
  });

  workToggle.addEventListener("pointerdown", (event) => {
    lastPointerType = event.pointerType;
  });

  workToggle.addEventListener("click", (event) => {
    const isTouchTap =
      mobileWorkLayout.matches ||
      (
        event.detail !== 0 &&
        (lastPointerType === "touch" || lastPointerType === "pen")
      );

    // First tap opens the dropdown; second tap follows Work.
    if (
      isTouchTap &&
      workToggle.getAttribute("aria-expanded") !== "true"
    ) {
      event.preventDefault();
      setWorkOpen(true);
    } else {
      setWorkOpen(false);
    }

    lastPointerType = "";
  });

  workToggle.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setWorkOpen(true);
      workMenu.querySelector("a")?.focus();
    }
  });

  workDropdown.addEventListener("focusout", (event) => {
    if (!workDropdown.contains(event.relatedTarget)) {
      setWorkOpen(false);
    }
  });

  workDropdown.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setWorkOpen(false);
      workToggle.focus();
    }
  });

  workMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setWorkOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!workDropdown.contains(event.target)) {
      setWorkOpen(false);
    }
  });
}

// MOBILE NAVIGATION
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  const mobileLayout = window.matchMedia("(max-width: 900px)");

  function setNavigationOpen(open) {
    primaryNav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );

    if (!open) {
      const dropdown = primaryNav.querySelector(".work-dropdown");

      dropdown?.classList.remove("is-open");
      dropdown?.querySelector(".work-toggle")
        ?.setAttribute("aria-expanded", "false");

      const menu = dropdown?.querySelector(".work-menu");
      if (menu) menu.inert = true;
    }
  }

  menuToggle.addEventListener("click", () => {
    setNavigationOpen(
      menuToggle.getAttribute("aria-expanded") !== "true"
    );
  });

  primaryNav.addEventListener("click", (event) => {
    if (
      mobileLayout.matches &&
      event.target.closest("a") &&
      !event.defaultPrevented
    ) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      mobileLayout.matches &&
      !primaryNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      setNavigationOpen(false);
      menuToggle.focus();
    }
  });

  primaryNav.addEventListener("focusout", (event) => {
    if (
      mobileLayout.matches &&
      !primaryNav.contains(event.relatedTarget) &&
      event.relatedTarget !== menuToggle
    ) {
      setNavigationOpen(false);
    }
  });

  mobileLayout.addEventListener("change", () => {
    const focusWasInNav = primaryNav.contains(document.activeElement);
    setNavigationOpen(false);

    if (mobileLayout.matches && focusWasInNav) {
      menuToggle.focus();
    }
  });
}