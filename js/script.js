let internalHashUpdate = false;

function openPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = "none";
    });

    document.querySelectorAll('.tablink').forEach(tab => {
        tab.classList.remove("active");
    });

    const activePage = document.getElementById(pageName);
    if (activePage) activePage.style.display = "block";

    internalHashUpdate = true;
    window.location.hash = pageName;
    internalHashUpdate = false;

    document
        .querySelector(`.tablink[data-page="${pageName}"]`)
        ?.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.tablink').forEach(tab => {
        tab.addEventListener('click', e => {
            e.preventDefault();
            const page = tab.dataset.page;
            openPage(page);
        });
    });

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {
        openPage(hash);
    } else {
        openPage("home");
    }
});

window.addEventListener("hashchange", () => {
    if (!internalHashUpdate) location.reload();
});

window.addEventListener("pageshow", e => {
    if (e.persisted) {
        const page = window.location.hash.replace("#", "");
        if (page) openPage(page);
    }
});
