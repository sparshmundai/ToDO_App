const dHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};

window.addEventListener("resize", dHeight);
dHeight();

$(document).ready(function () {
  let get_tag = document.querySelector(".w3-row-padding");
  $(".open-btn").click(function (e) {
    e.stopPropagation();
    document.getElementById("mySidebar").style.width = "70vw";
  });
  $(".close-btn").click(function (e) {
    e.stopPropagation();
    document.getElementById("mySidebar").style.width = "0";
  });

  $("#check_input").click(function () {
    if ($(this).is(':checked')){
      console.log("checked");
      $("body").css("background-color", "black");
      $(".w3-col").css("background-color", "white");
    }
    else {
      $("body").css("background-color", "white");
    }
  });
  $(document).click(function (e) {
    e.stopPropagation();
    if (!document.getElementsByClassName("w3-sidebar")[0].contains(e.target)) {
      document.getElementById("mySidebar").style.width = "0";
    }
  });

  let get_items = localStorage.getItem("notes");
  let convert_array = JSON.parse(get_items) || [];
  if (convert_array.length >= 1) {
    convert_array
      .map((data, index) => {
        return (get_tag.innerHTML += `
          <div class="w3-col s6 m4 l2">
         <div class="useBox w3-card w3-display-container">
            <h3 class="w3-display-topleft w3-margin">
            ${data.data.substr(0, 5) + "..."}
            </h3>
            <div class="w3-dropdown-hover w3-display-topright">
              <button class="dots w3-button"></button>
              <div class="w3-dropdown-content w3-bar-block w3-border">
                <button class="w3-bar-item w3-bu
                tton edit"  id=${data.id}
                >Edit</button>
                <button class="w3-bar-item w3-button delete" id=${data.id}
                >Delete</button>
              </div>
            </div>
            <div class="w3-display-bottomleft w3-small w3-margin">
              <span id="day">${data.date}</span>
            </div>
            </div>`);
      })
      .join("");
  }

  let store_notes_data = [...convert_array];

  let get_notes_val = document.querySelector(".notes");
  $(".save").click(function (e) {
    e.stopPropagation();
    let obj = {};
    if (get_notes_val.value.length >= 5) {
      obj["id"] = Date.now();
      obj["date"] = new Date().toDateString();
      obj["data"] = get_notes_val.value;
      store_notes_data.push(obj);

      localStorage.setItem("notes", JSON.stringify(store_notes_data));

      let get_row = document.createElement("div");
      get_row.className = "w3-col s6 m4 l2 w3-white";

      get_row.innerHTML = `<div class="n-col useBox w3-card w3-display-container">
            <h3 class="w3-display-topleft w3-margin">
            ${get_notes_val.value.substr(0, 5) + "..."}
            </h3>
            <div class="w3-dropdown-hover w3-display-topright">
              <button class="dots w3-button"></button>
              <div class="w3-dropdown-content w3-bar-block w3-border">
                <button class="w3-bar-item w3-button edit" id=${
                  obj.id
                }>Edit</button>
                <button class="w3-bar-item w3-button delete" id=${obj.id}
                >Delete</button>
              </div>
            </div>
            <div class="w3-display-bottomleft w3-small w3-margin">
              <span id="day">${obj.date}</span>
            </div>`;
 
      get_tag.appendChild(get_row);
      console.log(get_row);
      get_notes_val.value = "";
      $(".delete").click(function (e) {
        e.stopPropagation();
        const f_data = JSON.parse(localStorage.getItem("notes")).filter(
          (item) => item.id != this.id
        );

        store_notes_data = f_data;
        $(this).parents(".w3-col").remove();
        localStorage.setItem("notes", JSON.stringify(f_data));
      });
      document.getElementById("101").style.display = "none";
    }
  });

  $(".delete").click(function (e) {
    console.log(this);
    const f_data = JSON.parse(localStorage.getItem("notes")).filter(
      (item) => item.id != this.id
    );

    store_notes_data = f_data;

    $(this).parents(".w3-col").remove();
    localStorage.setItem("notes", JSON.stringify(f_data));
  });
});
