<template>
  <div>
    <div
      class="site-blocks-cover"
      style="height: 64px !important; min-height: 0; background: #ddd"
      data-aos="fade"
      id="home-section"
    ></div>
    <section class="site-section" id="gallery-section" data-aos="fade">
      <div class="container">
        <!-- <div class="row mb-3">
          <div class="col-12 text-center">
            <h2 class="section-title mb-3">Galeri</h2>
          </div>
        </div> -->

        <div id="posts" class="row no-gutter">
          <template v-for="(file, index) in gallery">
            <div
              class="item col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4"
              :key="index"
            >
              <a
                :href="file.filename"
                class="item-wrap fancybox xd"
                data-fancybox="mygallery"
                :data-caption="file.description"
              >
                <img v-lazy="file.filename" />
              </a>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import $ from "jquery";

import gallery from "../assets/gallery.json";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
  },
  computed: {
    gallery() {
      return this.shuffle(
        Array.from(
          gallery.map((x) =>
            x.files.map((file) => {
              return {
                filename:
                  this.publicPath + "gallery/" + x.folder + "/" + file.filename,
                description: file.description,
              };
            })
          )
        ).flat()
      );
    },
  },
  mounted() {
    // $(document).ready(function () {
    //   // add all to same gallery
    //   $(".gallery a").attr("data-fancybox", "mygallery");
    //   // assign captions and title from alt-attributes of images:
    //   $(".gallery a").each(function () {
    //     $(this).attr("data-caption", $(this).find("img").attr("alt"));
    //     $(this).attr("title", $(this).find("img").attr("alt"));
    //   });
    //   // start fancybox:
    //   $(".gallery a").fancybox();
    // });
    // [...document.querySelectorAll(".xd")].forEach((x) => {
    //   x.addEventListener("click", (e) => {
    //     console.log(e);
    //     setTimeout(() => {
    //       const div = document.createElement("div");
    //       if (e.target.dataset.fancybox) {
    //         div.innerHTML = e.target.dataset.fancybox;
    //         div.style.position = "absolute";
    //         div.style.bottom = "30px";
    //         div.style.color = "white";
    //         div.style.zIndex = "1241265125";
    //         div.style.fontSize = "22px";
    //         div.style.background = "#0000008a";
    //         div.style.width = "100%";
    //         div.style.textAlign = "center";
    //         document.querySelector(".fancybox-content").appendChild(div);
    //       }
    //     }, 1000);
    //   });
    // });
  },
};
</script>

<style >
.item-wrap.fancybox img {
  height: 300px !important;
  width: 100%;
  object-fit: cover;
}

.ieee-gallery {
  display: inline-block;
  text-align: center;
  margin: 10px auto;
  clear: both;
  padding: 0;
  padding: 10px;
  background-color: #ccc;
  border-radius: 5px;
}

.ieee-gallery img {
  /* thumbnails */
  width: 100px;
  height: 75px;
}

.block {
  display: inline-block;
  background-color: #ccc;
  border-radius: 5px;
  padding: 8px;
}
</style>

