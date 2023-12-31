(function($, madxartwork) {
  $("body").wrapInner('<div class="premium-magic-section-body-inner" />');
  // Flip Box Handler
  var PremiumFlipboxHandler = function($scope, $) {
    var flipboxElement = $scope.find(".premium-flip-main-Box");
    flipboxElement.on("mouseenter", function() {
      if (
        $(this)
          .children(".premium-flip-front")
          .hasClass("premium-flip-frontrl")
      ) {
        $(this)
          .find(
            ".premium-flip-front .premium-flip-front-content-container .premium-flip-front-content .premium-flip-text-wrapper"
          )
          .removeClass("PafadeInLeft")
          .addClass("PafadeInRight");

        $(this)
          .find(
            ".premium-flip-back .premium-flip-back-content-container .premium-flip-back-content .premium-flip-back-text-wrapper"
          )
          .addClass("PafadeInLeft")
          .removeClass("PafadeInRight");
      } else if (
        $(this)
          .children(".premium-flip-front")
          .hasClass("premium-flip-frontlr")
      ) {
        $(this)
          .find(
            ".premium-flip-front .premium-flip-front-content-container .premium-flip-front-content .premium-flip-text-wrapper"
          )
          .removeClass("PafadeInRevLeft")
          .addClass("PafadeInRevRight");

        $(this)
          .find(
            ".premium-flip-back .premium-flip-back-content-container .premium-flip-back-content .premium-flip-back-text-wrapper"
          )
          .addClass("PafadeInRevLeft")
          .removeClass("PafadeInRevRight");
      }
    });

    flipboxElement.on("mouseleave", function() {
      if (
        $(this)
          .children(".premium-flip-front")
          .hasClass("premium-flip-frontrl")
      ) {
        $(this)
          .find(
            ".premium-flip-front .premium-flip-front-content-container .premium-flip-front-content .premium-flip-text-wrapper"
          )
          .addClass("PafadeInLeft")
          .removeClass("PafadeInRight");

        $(this)
          .find(
            ".premium-flip-back .premium-flip-back-content-container .premium-flip-back-content .premium-flip-back-text-wrapper"
          )
          .removeClass("PafadeInLeft")
          .addClass("PafadeInRight");
      } else if (
        $(this)
          .children(".premium-flip-front")
          .hasClass("premium-flip-frontlr")
      ) {
        $(this)
          .find(
            ".premium-flip-front .premium-flip-front-content-container .premium-flip-front-content .premium-flip-text-wrapper"
          )
          .addClass("PafadeInRevLeft")
          .removeClass("PafadeInRevRight");

        $(this)
          .find(
            ".premium-flip-back .premium-flip-back-content-container .premium-flip-back-content .premium-flip-back-text-wrapper"
          )
          .removeClass("PafadeInRevLeft")
          .addClass("PafadeInRevRight");
      }
    });
  };

  // Unfold Handler
  var PremiumUnfoldHandler = function($scope, $) {
    var unfoldElement = $scope.find(".premium-unfold-wrap"),
      unfoldSettings = unfoldElement.data("settings"),
      contentHeight = parseInt(
        unfoldElement.find(".premium-unfold-editor-content").outerHeight()
      );

    if (unfoldSettings["foldSelect"] == "percent") {
      var foldHeight = (unfoldSettings["foldHeight"] / 100) * contentHeight;
    } else if (unfoldSettings["foldSelect"] == "pixel") {
      var foldHeight = unfoldSettings["foldHeight"];
    }
    unfoldElement
      .find(".premium-unfold-button-text")
      .text(unfoldSettings["foldText"]);
    unfoldElement.find(".premium-unfold-content").css({ height: foldHeight });
    unfoldElement
      .find(".premium-button i")
      .addClass(unfoldSettings["buttonUnfoldIcon"]);

    unfoldElement.find(".premium-button").click(function(e) {
      e.preventDefault();
      if (unfoldElement.find(".premium-unfold-content").hasClass("toggled")) {
        contentHeight = parseInt(
          unfoldElement.find(".premium-unfold-editor-content").outerHeight()
        );
        unfoldElement
          .find(".premium-unfold-button-text")
          .text(unfoldSettings["unfoldText"]);
        unfoldElement
          .find(".premium-unfold-content")
          .animate(
            { height: contentHeight },
            unfoldSettings["unfoldDur"],
            unfoldSettings["unfoldEase"]
          )
          .removeClass("toggled");
        unfoldElement.find(".premium-unfold-gradient").toggleClass("toggled");
        unfoldElement
          .find(".premium-button i")
          .removeClass(unfoldSettings["buttonUnfoldIcon"])
          .addClass(unfoldSettings["buttonIcon"]);
      } else {
        unfoldElement
          .find(".premium-unfold-button-text")
          .text(unfoldSettings["foldText"]);
        unfoldElement
          .find(".premium-unfold-content")
          .animate(
            { height: foldHeight },
            unfoldSettings["foldDur"],
            unfoldSettings["foldEase"]
          )
          .addClass("toggled");
        unfoldElement.find(".premium-unfold-gradient").toggleClass("toggled");
        unfoldElement
          .find(".premium-button i")
          .removeClass(unfoldSettings["buttonIcon"])
          .addClass(unfoldSettings["buttonUnfoldIcon"]);
      }
    });
  };

  // Facebook Messenger Handler
  var PremiumFbChatHandler = function($scope, $) {
    var premiumFbChat = $scope.find(".premium-fbchat-container"),
      premiumFbChatSettings = premiumFbChat.data("settings");
    if (premiumFbChat.length > 0) {
      if (premiumFbChatSettings["hideMobile"]) {
        if ($(window).outerWidth() > 767) {
          window.fbAsyncInit = function() {
            FB.init({
              appId: premiumFbChatSettings["appId"],
              autoLogAppEvents: !0,
              xfbml: !0,
              version: "v3.2"
            });
          };
          (function(a, b, c) {
            var d = a.getElementsByTagName(b)[0];
            a.getElementById(c) ||
              ((a = a.createElement(b)),
              (a.id = c),
              (a.src =
                "https://connect.facebook.net/" +
                premiumFbChatSettings["lang"] +
                "/sdk/xfbml.customerchat.js"),
              d.parentNode.insertBefore(a, d));
          })(document, "script", "facebook-jssdk");
        }
      } else {
        window.fbAsyncInit = function() {
          FB.init({
            appId: premiumFbChatSettings["appId"],
            autoLogAppEvents: !0,
            xfbml: !0,
            version: "v3.2"
          });
        };
        (function(a, b, c) {
          var d = a.getElementsByTagName(b)[0];
          a.getElementById(c) ||
            ((a = a.createElement(b)),
            (a.id = c),
            (a.src =
              "https://connect.facebook.net/" +
              premiumFbChatSettings["lang"] +
              "/sdk/xfbml.customerchat.js"),
            d.parentNode.insertBefore(a, d));
        })(document, "script", "facebook-jssdk");
      }
      $(".madxartwork-element-overlay .madxartwork-editor-element-remove").on(
        "click",
        function() {
          var $this = $(this);
          parentId = $this.parents("section.madxartwork-element");
          if (parentId.find("#premium-fbchat-container").length) {
            document.location.href = document.location.href;
          }
        }
      );
    }
  };

  // Twitter Feed Handler
  var PremiumTwitterFeedHandler = function($scope, $) {
    var premiumTwitterFeedElement = $scope.find(
        ".premium-twitter-feed-wrapper"
      ),
      loadingFeed = premiumTwitterFeedElement.find(".premium-loading-feed"),
      premiumTwitterSettings = premiumTwitterFeedElement.data("settings");

    function get_tweets_data() {
      premiumTwitterFeedElement
        .find(".premium-social-feed-container")
        .socialfeed({
          twitter: {
            accounts: premiumTwitterSettings["accounts"],
            limit: premiumTwitterSettings["limit"],
            consumer_key: premiumTwitterSettings["consKey"],
            consumer_secret: premiumTwitterSettings["consSec"],
            tweet_mode: "extended"
          },
          length: premiumTwitterSettings["length"],
          show_media: premiumTwitterSettings["showMedia"],
          template: premiumTwitterSettings["template"]
        });
    }

    function twitter_masonry_grid() {
      var masonryContainer = premiumTwitterFeedElement.find(
        ".premium-social-feed-container"
      );
      masonryContainer.isotope({
        // options
        itemSelector: ".premium-social-feed-element-wrap",
        percentPosition: true,
        layoutMode: "masonry",
        animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false
            }
        });
//        $(masonryContainer).masonry({
//            itemSelector: ".premium-social-feed-element-wrap",
//            percentPosition: true
//        });
    }

    $.ajax({
      url: get_tweets_data(),
      beforeSend: function() {
        loadingFeed.addClass("premium-show-loading");
      },
      success: function() {
        if (premiumTwitterSettings["layout"] === "grid-layout") {
          setTimeout(function() {
            premiumTwitterFeedElement.imagesLoaded(function() {
              twitter_masonry_grid();
            });
          }, 2000);
        }
        loadingFeed.removeClass("premium-show-loading");
      },
      error: function() {
        console.log("error getting data from Twitter");
      }
    });
  };

  // Alert Box Handler
  var PremiumNotBarHandler = function($scope, $) {
    var premiumNotBarElem = $scope.find(".premium-notbar-outer-container"),
      premiumNotBarSettings = premiumNotBarElem.data("settings"),
      _this = $(premiumNotBarElem);

    if (_this.length > 0) {
      if (premiumNotBarSettings["responsive"]) {
        if (premiumNotBarSettings["hideMobs"]) {
          if (
            $(window).outerWidth() < parseInt(premiumNotBarSettings["mobSize"])
          ) {
            premiumNotBarElem.css("display", "none");
          }
        }

        if (premiumNotBarSettings["hideTabs"]) {
          if (
            $(window).outerWidth() <
              parseInt(premiumNotBarSettings["tabSize"]) &&
            $(window).outerWidth() > parseInt(premiumNotBarSettings["mobSize"])
          ) {
            premiumNotBarElem.css("display", "none");
          }
        }
      }

      if (!madxartworkFrontend.isEditMode() && !$("body").hasClass("logged-in")) {
        if (premiumNotBarSettings["cookies"]) {
          if (
            notificationReadCookie(
              "premiumNotBar-" + premiumNotBarSettings["id"]
            )
          ) {
            premiumNotBarElem.css("display", "none");
          }
        }
      }

      function notificationSetCookie(cookieName, cookieValue) {
        var today = new Date(),
          expire = new Date();

        expire.setTime(
          today.getTime() + 3600000 * premiumNotBarSettings["interval"]
        );

        document.cookie =
          cookieName +
          "=" +
          encodeURI(cookieValue) +
          ";expires=" +
          expire.toGMTString() +
          "; path=/";
      }

      function notificationReadCookie(cookieName) {
        var theCookie = " " + document.cookie;

        var ind = theCookie.indexOf(" " + cookieName + "=");

        if (ind == -1) ind = theCookie.indexOf(";" + cookieName + "=");

        if (ind == -1 || cookieName == "") return "";

        var ind1 = theCookie.indexOf(";", ind + 1);

        if (ind1 == -1) ind1 = theCookie.length;

        return unescape(theCookie.substring(ind + cookieName.length + 2, ind1));
      }

      if (
        premiumNotBarSettings["location"] == "top" &&
        premiumNotBarSettings["position"] == "premium-notbar-relative"
      ) {
        $(premiumNotBarElem).detach();

        $("body").prepend(_this);
      }

      if (premiumNotBarSettings["layout"] == "boxed") {
        var not_width = premiumNotBarElem
          .find(".premium-notbar")
          .parent()
          .width();

        premiumNotBarElem.find(".premium-notbar").css("width", not_width);

        $(window).on("resize", function() {
          var not_width = premiumNotBarElem
            .find(".premium-notbar")
            .parent()
            .width();

          premiumNotBarElem.find(".premium-notbar").css("width", not_width);
        });
      }

      premiumNotBarElem.find(".premium-notbar-close").on("click", function() {
        if (
          !madxartworkFrontend.isEditMode() &&
          !$("body").hasClass("logged-in")
        ) {
          if (premiumNotBarSettings["cookies"]) {
            if (
              !notificationReadCookie(
                "premiumNotBar-" + premiumNotBarSettings["id"]
              )
            ) {
              notificationSetCookie(
                "premiumNotBar-" + premiumNotBarSettings["id"],
                true
              );
            }
          }
        }

        if (
          $(this).hasClass("premium-notbar-top") ||
          $(this).hasClass("premium-notbar-edit-top")
        ) {
          if (premiumNotBarSettings["position"] == "premium-notbar-fixed") {
            $(this)
              .parentsUntil(".premium-notbar-outer-container")
              .css("top", "-1000px");
          } else {
            $(premiumNotBarElem).animate({ height: "0" }, 300);
          }
        } else if ($(this).hasClass("premium-notbar-bottom")) {
          $(this)
            .parentsUntil(".premium-notbar-outer-container")
            .css("bottom", "-1000px");
        } else {
          $(this)
            .parentsUntil(".premium-notbar-outer-container")
            .css({
              visibility: "hidden",
              opacity: "0"
            });
        }
      });
    }
  };

  // Charts Handler
  var PremiumChartHandler = function($scope, $) {
    var premiumChart = $scope.find(".premium-chart-container"),
      premiumChartSettings = premiumChart.data("settings"),
      type = premiumChartSettings["type"],
      eventsArray = [
        "mousemove",
        "mouseout",
        "click",
        "touchstart",
        "touchmove"
      ],
      printVal = premiumChartSettings["printVal"],
      event =
        ("pie" == type || "doughnut" == type) && printVal ? false : eventsArray,
      premiumChartData = premiumChart.data("chart"),
      data = {
        labels: premiumChartSettings["xlabels"],
        datasets: []
      };

    function renderChart() {
      var ctx = document
          .getElementById(premiumChartSettings["chartId"])
          .getContext("2d"),
        premiumChartGraph = document.getElementById(
          premiumChartSettings["chartId"]
        );

      var myChart = new Chart(ctx, {
        type: type,
        data: data,
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: type == "polarArea" ? 6 : 0
            }
          },
          events: event,
          animation: {
            duration: 500,
            easing: premiumChartSettings["easing"],
            onComplete: function() {
              if (!event) {
                this.defaultFontSize = 16;
                ctx.font =
                  '15px "Helvetica Neue", "Helvetica", "Arial", sans-serif';

                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";

                this.data.datasets.forEach(function(dataset) {
                  for (var i = 0; i < dataset.data.length; i++) {
                    var model =
                        dataset._meta[Object.keys(dataset._meta)[0]].data[i]
                          ._model,
                      total =
                        dataset._meta[Object.keys(dataset._meta)[0]].total,
                      mid_radius =
                        model.innerRadius +
                        (model.outerRadius - model.innerRadius) / 2,
                      start_angle = model.startAngle,
                      end_angle = model.endAngle,
                      mid_angle = start_angle + (end_angle - start_angle) / 2;

                    var x = mid_radius * Math.cos(mid_angle);
                    var y = mid_radius * Math.sin(mid_angle);

                    ctx.fillStyle = "#fff";
                    if (i == 3) {
                      // Darker text color for lighter background
                      ctx.fillStyle = "#444";
                    }
                    var percent =
                      String(Math.round((dataset.data[i] / total) * 100)) + "%";

                    ctx.fillText(percent, model.x + x, model.y + y + 15);
                  }
                });
              }
            }
          },
          tooltips: {
            enabled: premiumChartSettings["enTooltips"],
            mode: premiumChartSettings["modTooltips"],
            callbacks: {
              label: function(tooltipItem, data) {
                var prefixString = "";
                if (
                  "pie" == type ||
                  "doughnut" == type ||
                  "polarArea" == type
                ) {
                  prefixString = data.labels[tooltipItem.index] + ": ";
                }
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function(
                  previousValue,
                  currentValue
                ) {
                  return parseFloat(previousValue) + parseFloat(currentValue);
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = ((currentValue / total) * 100).toPrecision(3);
                return (
                  prefixString +
                  (premiumChartSettings["percentage"]
                    ? percentage + "%"
                    : currentValue)
                );
              }
            }
          },
          legend: {
            display: premiumChartSettings["legDis"],
            position: premiumChartSettings["legPos"],
            reverse: premiumChartSettings["legRev"],
            onClick: null,
            labels: {
              boxWidth: parseInt(premiumChartSettings["itemWid"]),
              fontColor: premiumChartSettings["legCol"],
              fontSize: parseInt(premiumChartSettings["legSize"])
            }
          },
          scales: {
            xAxes: [
              {
                barPercentage: premiumChartSettings["xwidth"],
                display:
                  type == "radar" ||
                  type == "pie" ||
                  type == "polarArea" ||
                  type == "doughnut"
                    ? false
                    : true,
                gridLines: {
                  display: premiumChartSettings["xGrid"],
                  color: premiumChartSettings["xGridCol"]
                },
                scaleLabel: {
                  display: premiumChartSettings["xlabeldis"],
                  labelString: premiumChartSettings["xlabel"],
                  fontColor: premiumChartSettings["xlabelcol"],
                  fontSize: premiumChartSettings["xlabelsize"]
                },
                ticks: {
                  fontSize: premiumChartSettings["xTicksSize"],
                  fontColor: premiumChartSettings["xTicksCol"],
                  maxRotation: premiumChartSettings["xTicksRot"],
                  minRotation: premiumChartSettings["xTicksRot"],
                  beginAtZero: premiumChartSettings["xTicksBeg"],
                  callback: function(tick) {
                    return tick.toLocaleString();
                  }
                }
              }
            ],
            yAxes: [
              {
                display:
                  type == "radar" ||
                  type == "pie" ||
                  type == "polarArea" ||
                  type == "doughnut"
                    ? false
                    : true,
                type: premiumChartSettings["yAxis"],
                ticks: {
                  suggestedMax: premiumChartSettings["suggestedMax"],
                  fontSize: premiumChartSettings["yTicksSize"],
                  fontColor: premiumChartSettings["yTicksCol"],
                  beginAtZero: premiumChartSettings["yTicksBeg"],
                  callback: function(tick) {
                    return tick.toLocaleString();
                  }
                },
                scaleLabel: {
                  display: premiumChartSettings["ylabeldis"],
                  labelString: premiumChartSettings["ylabel"],
                  fontColor: premiumChartSettings["ylabelcol"],
                  fontSize: premiumChartSettings["ylabelsize"]
                },
                gridLines: {
                  display: premiumChartSettings["yGrid"],
                  color: premiumChartSettings["yGridCol"]
                }
              }
            ]
          }
        }
      });

      $(premiumChartGraph).height(premiumChartSettings["height"]);
      premiumChartData.forEach(function(element) {
        if (type != "pie" && type != "doughnut") {
          var gradient = ctx.createLinearGradient(0, 0, 0, 600),
            secondColor = element.backgroundColor[1]
              ? element.backgroundColor[1]
              : element.backgroundColor[0];
          gradient.addColorStop(0, element.backgroundColor[0]);
          gradient.addColorStop(1, secondColor);
          element.backgroundColor = gradient;
          element.hoverBackgroundColor = gradient;
        }
        data.datasets.push(element);
        myChart.update();
      });

      $("#" + premiumChartSettings["chartId"]).on("click", function(evt) {
        var activePoint = myChart.getElementAtEvent(evt);
        if (activePoint[0]) {
          var URL =
            myChart.data.datasets[activePoint[0]._datasetIndex].links[
              activePoint[0]._index
            ];
          if (URL != null && URL != "") {
            window.open(URL, premiumChartSettings["target"]);
          }
        }
      });
    }
    var $checkModal = $(premiumChart).closest(".premium-modal-box-modal");

    if ($checkModal.length) {
      renderChart();
    }
    var waypoint = new Waypoint({
      element: $("#" + premiumChartSettings["chartId"]),
      offset: Waypoint.viewportHeight() - 250,
      triggerOnce: true,
      handler: function() {
        renderChart();
        this.destroy();
      }
    });
  };

  // Instagram Feed Handler
  var instaCounter = 0;
  var PremiumInstaFeedHandler = function($scope, $) {
    instaCounter++;
    var premiumInstaElem = $scope.find(".premium-instafeed-container"),
      loadingFeed = premiumInstaElem.find(".premium-loading-feed"),
      premiumInstaSettings = premiumInstaElem.data("settings");

    var template =
      '<div class="premium-insta-feed premium-insta-box"><div class="premium-insta-feed-inner"><div class="premium-insta-feed-wrap"><div class="premium-insta-img-wrap"><img src="{{image}}"/></div><div class="premium-insta-info-wrap"><div class="premium-insta-likes-comments">' +
      premiumInstaSettings["likes"] +
      premiumInstaSettings["comments"] +
      "</div></div>" +
      premiumInstaSettings["link"] +
      "</div></div></div>";

    function premium_insta_feed() {
      var feed = new Instafeed({
        target: premiumInstaSettings["id"],
        clientId: premiumInstaSettings["clientId"],
        accessToken: premiumInstaSettings["accesstok"],
        get: premiumInstaSettings["get"],
        userId: premiumInstaSettings["user"],
        locationId: premiumInstaSettings["location"],
        tagName: premiumInstaSettings["tag"],
        sortBy: premiumInstaSettings["sort"],
        limit: premiumInstaSettings["limit"],
        resolution: premiumInstaSettings["res"],
        template: template
      });

      try {
        feed.run();
      } catch (err) {
        console.log(err);
      }
    }
    
    $(window).load(function() {
      premiumInstaElem.imagesLoaded(function() {
        $(premiumInstaElem)
          .find(".premium-insta-feed-wrap a[data-rel^='prettyPhoto']")
          .prettyPhoto({
            theme: "pp_default",
            hook: "data-rel",
            opacity: 0.7,
            show_title: false,
            deeplinking: false,
            overlay_gallery: false,
            custom_markup: "",
            default_width: 900,
            default_height: 506,
            social_tools: ""
          });
      });
    });

    function instagram_masonry_grid() {
        premiumInstaElem.isotope({
        // options
        itemSelector: ".premium-insta-feed",
        percentPosition: true,
        layoutMode: "masonry",
        animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false
            }
        });
//      $(premiumInstaElem).masonry({
//        itemSelector: ".premium-insta-feed",
//        percentPosition: true
//      });
    }

    if (premiumInstaElem.closest(".premium-magic-section-wrap").length === 1) {
      if (instaCounter === 1) {
        $.ajax({
          url: premium_insta_feed(),
          beforeSend: function() {
            loadingFeed.addClass("premium-show-loading");
          },
          success: function() {
            if (premiumInstaSettings["masonry"]) {
              setTimeout(function() {
                premiumInstaElem.imagesLoaded(function() {
                  instagram_masonry_grid();
                });
              }, 2000);
            }
            loadingFeed.removeClass("premium-show-loading");
          }
        });
      }
    } else {
      $.ajax({
        url: premium_insta_feed(),
        beforeSend: function() {
          loadingFeed.addClass("premium-show-loading");
        },
        success: function() {
          if (premiumInstaSettings["masonry"]) {
            setTimeout(function() {
              premiumInstaElem.imagesLoaded(function() {
                instagram_masonry_grid();
              });
            }, 2000);
          }
          loadingFeed.removeClass("premium-show-loading");
        }
      });
    }
  };

  // Facebook Feed Handler
  var PremiumFacebookHandler = function($scope, $) {
    var premiumFacebookFeedElement = $scope.find(
        ".premium-facebook-feed-wrapper"
      ),
      loadingFeed = premiumFacebookFeedElement.find(".premium-loading-feed"),
      premiumFacebookSettings = premiumFacebookFeedElement.data("settings");

    function get_facebook_data() {
      premiumFacebookFeedElement
        .find(".premium-social-feed-container")
        .socialfeed({
          facebook: {
            accounts: [premiumFacebookSettings["accounts"]],
            limit: premiumFacebookSettings["limit"],
            access_token: premiumFacebookSettings["accessTok"]
          },
          length: premiumFacebookSettings["length"],
          show_media: premiumFacebookSettings["showMedia"],
          template: premiumFacebookSettings["template"]
        });
    }

    function facebook_masonry_grid() {
      var masonryContainer = premiumFacebookFeedElement.find(
        ".premium-social-feed-container"
      );
      masonryContainer.isotope({
        // options
        itemSelector: ".premium-social-feed-element-wrap",
        percentPosition: true,
        layoutMode: "masonry",
        animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false
            }
        });
//      $(masonryContainer).masonry({
//        itemSelector: ".premium-social-feed-element-wrap",
//        percentPosition: true
//      });
    }

    $.ajax({
      url: get_facebook_data(),
      beforeSend: function() {
        loadingFeed.addClass("premium-show-loading");
      },
      success: function() {
        if (premiumFacebookSettings["layout"] === "grid-layout") {
            setTimeout(function() {
            premiumFacebookFeedElement.imagesLoaded(function() {
              facebook_masonry_grid();
            });
          }, 2000);
        }
        loadingFeed.removeClass("premium-show-loading");
      },
      error: function() {
        console.log("error getting data from Facebook");
      }
    });
  };

  // Tabs Handler
  var PremiumTabsHandler = function($scope, $) {
    var premiumTabsElem = $scope.find(".premium-tabs-container"),
      premiumTabsSettings = premiumTabsElem.data("settings"),
      id = "#premium-tabs-" + premiumTabsSettings["id"];
    [].slice.call(document.querySelectorAll(id)).forEach(function(el) {
      new CBPFWTabs(el);
    });
  };
  window.CBPFWTabs = function(t, i) {
    var self = this;
    self.el = t;
    self.options = { start: 0 };
    self.extend = function(t, s) {
      for (var i in s) s.hasOwnProperty(i) && (t[i] = s[i]);
      return t;
    };
    self._init = function() {
      self.tabs = [].slice.call(self.el.querySelectorAll("nav > ul > li"));
      self.items = [].slice.call(
        self.el.querySelectorAll(".premium-content-wrap > section")
      );
      self.current = -1;
      self._show(), self._initEvents();
    };
    self._initEvents = function() {
      self.tabs.forEach(function(s, i) {
        s.addEventListener("click", function(s) {
          s.preventDefault(), self._show(i);
        });
      });
    };
    self._show = function(t) {
      self.current >= 0 &&
        (self.tabs[self.current].className = self.items[
          self.current
        ].className = "premium-tabs-content-section"),
        (self.current =
          void 0 != t
            ? t
            : self.options.start >= 0 && self.options.start < self.items.length
            ? self.options.start
            : 0),
        (self.tabs[self.current].className =
          "premium-tabs-nav-list-item tab-current"),
        (self.items[self.current].className =
          "premium-tabs-content-section content-current");
    };
    self.options = self.extend({}, self.options);
    self.extend(self.options, i);
    self._init();
  };

  //    window.CBPFWTabs = CBPFWTabs;

  // Magic Section Handler
  var PremiumMagicSectionHandler = function($scope, $) {
    var bodyInnerWrap = $("body .premium-magic-section-body-inner");
    function getWraptoOrg() {
      bodyInnerWrap.css({
        top: 0,
        left: 0,
        right: 0
      });
    }

    getWraptoOrg();

    var premiumMagicSectionElem = $scope.find(".premium-magic-section-wrap"),
      premiumMagicSectionWrap = $scope.find(".premium-magic-section-container"),
      premiumMagicSectionSettings = premiumMagicSectionElem.data("settings"),
      offset,
      offsetAw,
      gutter,
      inIcon = premiumMagicSectionSettings["inIcon"],
      outIcon = premiumMagicSectionSettings["outIcon"];

    premiumMagicSectionElem.ready(function() {
      if (
        premiumMagicSectionElem
          .find(".premium-magic-section-content-wrap")
          .outerWidth() > premiumMagicSectionElem.outerWidth()
      )
        premiumMagicSectionElem
          .find(".premium-magic-section-content-wrap-out")
          .css("overflow-x", "scroll");
      if (
        premiumMagicSectionElem
          .find(".premium-magic-section-content-wrap")
          .outerHeight() > premiumMagicSectionElem.outerHeight()
      )
        premiumMagicSectionElem
          .find(".premium-magic-section-content-wrap-out")
          .css("overflow-y", "scroll");
    });

    gutter = getGutter(premiumMagicSectionElem);

    function getGutter(elem) {
      var settings = $(elem).data("settings"),
        gutter =
          settings["position"] === "top" || settings["position"] === "bottom"
            ? (settings["gutter"] / 100) * $(elem).outerHeight()
            : (settings["gutter"] / 100) * $(elem).outerWidth();
      return gutter;
    }

    if (premiumMagicSectionSettings["responsive"]) {
      if (premiumMagicSectionSettings["hideMobs"]) {
        if (
          $(window).outerWidth() <
          parseInt(premiumMagicSectionSettings["mobSize"])
        ) {
          premiumMagicSectionWrap.css("display", "none");

          $(window).on("resize", function() {
            premiumMagicSectionWrap.css("display", "none");
          });
        }
      }

      if (premiumMagicSectionSettings["hideTabs"]) {
        if (
          $(window).outerWidth() <
            parseInt(premiumMagicSectionSettings["tabSize"]) &&
          $(window).outerWidth() >
            parseInt(premiumMagicSectionSettings["mobSize"])
        ) {
          premiumMagicSectionWrap.css("display", "none");

          $(window).on("resize", function() {
            premiumMagicSectionWrap.css("display", "none");
          });
        }
      }
    }

    switch (premiumMagicSectionSettings["position"]) {
      case "top":
        offset = -1 * (premiumMagicSectionElem.outerHeight() - gutter);
        premiumMagicSectionElem.css("top", offset);
        break;
      case "right":
        offset = -1 * (premiumMagicSectionElem.outerWidth() - gutter);
        premiumMagicSectionElem.css("right", offset);
        break;
      case "left":
        offset = -1 * (premiumMagicSectionElem.outerWidth() - gutter);
        premiumMagicSectionElem.css("left", offset);
        break;
    }

    premiumMagicSectionElem
      .find(".premium-magic-section-icon-wrap .premium-magic-section-btn")
      .on("click", function() {
        var nearestMagicSection = $(this).closest(
            ".premium-magic-section-wrap"
          ),
          magicSections = $("body")
            .find("div.premium-magic-section-wrap")
            .not(nearestMagicSection);
        $.each(magicSections, function(index, elem) {
          if ($(elem).hasClass("in")) {
            var sectionPos = $(elem).data("settings")["position"],
              style = $(elem).data("settings")["style"],
              inIconAw = $(elem).data("settings")["inIcon"],
              outIconAw = $(elem).data("settings")["outIcon"],
              gutterAw = getGutter(elem);
            if (style === "push") {
              getWraptoOrg();
            }
            $(elem)
              .find(".premium-magic-section-btn")
              .removeClass(outIconAw)
              .addClass(inIconAw);
            $(elem).toggleClass("in out");
            switch (sectionPos) {
              case "top":
                offsetAw = -1 * ($(elem).outerHeight() - gutterAw);
                $(elem).animate({ top: offsetAw }, "fast", "linear");
                break;
              case "bottom":
                offsetAw = -1 * ($(elem).outerHeight() - gutterAw);
                $(elem).animate({ bottom: offsetAw }, "fast", "linear");
                break;
              case "left":
                offsetAw = -1 * ($(elem).outerWidth() - gutterAw);
                $(elem).animate({ left: offsetAw }, "fast", "linear");
                break;
              case "right":
                offsetAw = -1 * ($(elem).outerWidth() - gutterAw);
                $(elem).animate({ right: offsetAw }, "fast", "linear");
                break;
            }
          }
        });
        if (nearestMagicSection.hasClass("out")) {
          $(this)
            .removeClass(inIcon)
            .addClass(outIcon);
        } else {
          $(this)
            .removeClass(outIcon)
            .addClass(inIcon);
        }
        if (nearestMagicSection.hasClass("out")) {
          nearestMagicSection
            .parent()
            .siblings(".premium-magic-section-overlay")
            .addClass("active");
        } else {
          nearestMagicSection
            .parent()
            .siblings(".premium-magic-section-overlay")
            .removeClass("active");
        }
        nearestMagicSection.toggleClass("in out");
        switch (premiumMagicSectionSettings["position"]) {
          case "top":
            offset = -1 * (premiumMagicSectionElem.outerHeight() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ top: offset }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.animate(
                  {
                    top: 0
                  },
                  "fast",
                  "linear"
                );
              }
            } else {
              nearestMagicSection.animate({ top: 0 }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.animate(
                  {
                    top: -1 * offset
                  },
                  "fast",
                  "linear"
                );
              }
            }
            break;
          case "bottom":
            offset = -1 * (premiumMagicSectionElem.outerHeight() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ bottom: offset }, "fast", "linear");
            } else {
              nearestMagicSection.animate({ bottom: 0 }, "fast", "linear");
            }
            break;
          case "right":
            offset = -1 * (premiumMagicSectionElem.outerWidth() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ right: offset }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("left", "auto").animate(
                  {
                    right: 0
                  },
                  "fast",
                  "linear"
                );
              }
            } else {
              nearestMagicSection.animate({ right: 0 }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("left", "auto").animate(
                  {
                    right: -1 * offset
                  },
                  "fast",
                  "linear"
                );
              }
            }
            break;
          case "left":
            offset = -1 * (premiumMagicSectionElem.outerWidth() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ left: offset }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("right", "auto").animate(
                  {
                    left: 0
                  },
                  "fast",
                  "linear"
                );
              }
            } else {
              nearestMagicSection.animate({ left: 0 }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("right", "auto").animate(
                  {
                    left: -1 * offset
                  },
                  "fast",
                  "linear"
                );
              }
            }
            break;
        }
      });

    premiumMagicSectionWrap
      .siblings(".premium-magic-section-overlay")
      .on("click", function() {
        premiumMagicSectionElem
          .siblings(".premium-magic-section-button-trig")
          .children(".premium-magic-section-btn")
          .trigger("click");
        premiumMagicSectionElem
          .find(".premium-magic-section-icon-wrap")
          .children(".premium-magic-section-btn")
          .trigger("click");
      });

    $("body").on("click", function(event) {
      var trigButton =
          "div.premium-magic-section-button-trig .premium-magic-section-btn",
        trigIcon =
          "div.premium-magic-section-icon-wrap .premium-magic-section-btn",
        buttonContent = ".premium-magic-section-btn *",
        magicSec = "div.premium-magic-section-content-wrap-out",
        magicSecContent = "div.premium-magic-section-content-wrap-out *";
      if (
        !$(event.target).is($(buttonContent)) &&
        !$(event.target).is($(trigButton)) &&
        !$(event.target).is($(trigIcon)) &&
        !$(event.target).is($(magicSec)) &&
        !$(event.target).is($(magicSecContent))
      ) {
        if (premiumMagicSectionElem.hasClass("in")) {
          premiumMagicSectionElem
            .siblings(".premium-magic-section-button-trig")
            .children(".premium-magic-section-btn")
            .trigger("click");
          premiumMagicSectionElem
            .find(".premium-magic-section-icon-wrap")
            .children(".premium-magic-section-btn")
            .trigger("click");
        }
      }
    });

    premiumMagicSectionElem
      .find(".premium-magic-section-close-wrap")
      .on("click", function() {
        if (premiumMagicSectionElem.hasClass("in")) {
          $(this)
            .parent()
            .siblings(".premium-magic-section-button-trig")
            .children(".premium-magic-section-btn")
            .trigger("click");
          $(this)
            .siblings(".premium-magic-section-icon-wrap")
            .children(".premium-magic-section-btn")
            .trigger("click");
        }
      });

    premiumMagicSectionElem
      .siblings(".premium-magic-section-button-trig")
      .children(".premium-magic-section-btn")
      .on("click", function() {
        var nearestMagicSection = $(this)
            .closest(".premium-magic-section-button-trig")
            .siblings(".premium-magic-section-wrap"),
          magicSections = $("body")
            .find("div.premium-magic-section-wrap")
            .not(nearestMagicSection);
        nearestMagicSection.toggleClass("in out");
        $.each(magicSections, function(index, elem) {
          if ($(elem).hasClass("in")) {
            var sectionPos = $(elem).data("settings")["position"],
              style = $(elem).data("settings")["style"],
              inIconAw = $(elem).data("settings")["inIcon"],
              outIconAw = $(elem).data("settings")["outIcon"],
              gutterAw = getGutter(elem);

            if (style === "push") {
              getWraptoOrg();
            }
            $(elem)
              .find(".premium-magic-section-btn")
              .removeClass(outIconAw)
              .addClass(inIconAw);
            $(elem).toggleClass("in out");
            switch (sectionPos) {
              case "top":
                offsetAw = -1 * ($(elem).outerHeight() - gutterAw);
                $(elem).animate({ top: offsetAw }, "fast", "linear");
                break;
              case "bottom":
                offsetAw = -1 * ($(elem).outerHeight() - gutterAw);
                $(elem).animate({ bottom: offsetAw }, "fast", "linear");
                break;
              case "left":
                offsetAw = -1 * ($(elem).outerWidth() - gutterAw);
                $(elem).animate({ left: offsetAw }, "fast", "linear");
                break;
              case "right":
                offsetAw = -1 * ($(elem).outerWidth() - gutterAw);
                $(elem).animate({ right: offsetAw }, "fast", "linear");
                break;
            }
          }
        });
        if (nearestMagicSection.hasClass("out")) {
          nearestMagicSection
            .parent()
            .siblings(".premium-magic-section-overlay")
            .removeClass("active");
        } else {
          nearestMagicSection
            .parent()
            .siblings(".premium-magic-section-overlay")
            .addClass("active");
        }
        switch (premiumMagicSectionSettings["position"]) {
          case "top":
            offset = -1 * (premiumMagicSectionElem.outerHeight() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ top: offset }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.animate(
                  {
                    top: 0
                  },
                  "fast",
                  "linear"
                );
              }
            } else {
              nearestMagicSection.animate({ top: 0 }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.animate(
                  {
                    top: -1 * offset
                  },
                  "fast",
                  "linear"
                );
              }
            }
            break;
          case "bottom":
            offset = -1 * (premiumMagicSectionElem.outerHeight() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ bottom: offset }, "fast", "linear");
            } else {
              nearestMagicSection.animate({ bottom: 0 }, "fast", "linear");
            }
            break;
          case "right":
            offset = -1 * (premiumMagicSectionElem.outerWidth() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ right: offset }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("left", "auto").animate(
                  {
                    right: 0
                  },
                  "fast",
                  "linear"
                );
              }
            } else {
              nearestMagicSection.animate({ right: 0 }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("left", "auto").animate(
                  {
                    right: -1 * offset
                  },
                  "fast",
                  "linear"
                );
              }
            }
            break;
          case "left":
            offset = -1 * (premiumMagicSectionElem.outerWidth() - gutter);
            if (nearestMagicSection.hasClass("out")) {
              nearestMagicSection.animate({ left: offset }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("right", "auto").animate(
                  {
                    left: 0
                  },
                  "fast",
                  "linear"
                );
              }
            } else {
              nearestMagicSection.animate({ left: 0 }, "fast", "linear");
              if (premiumMagicSectionSettings["style"] == "push") {
                bodyInnerWrap.css("right", "auto").animate(
                  {
                    left: -1 * offset
                  },
                  "fast",
                  "linear"
                );
              }
            }
            break;
        }
      });
  };

  // Preview Window Handler
  var PremiumPreviewWindowHandler = function($scope, $) {
    var previewImageElem = $scope.find(".premium-preview-image-wrap"),
      previewImageMagSettings = previewImageElem.data("settings"),
      previewImageOffset = $(previewImageElem).offset().left,
      windowWidth = $(window).outerWidth(),
      minWidth = null,
      maxWidth = null;

    if (windowWidth <= 768) {
      minWidth = previewImageMagSettings["minWidthMobs"];
      maxWidth = previewImageMagSettings["maxWidthMobs"];
    } else if (windowWidth > 768 && $(this).outerWidth() <= 1024) {
      minWidth = previewImageMagSettings["minWidthTabs"];
      maxWidth = previewImageMagSettings["maxWidthTabs"];
    } else {
      minWidth = previewImageMagSettings["minWidth"];
      maxWidth = previewImageMagSettings["maxWidth"];
    }

    if (previewImageMagSettings["responsive"]) {
      if (previewImageOffset < previewImageMagSettings["minWidth"]) {
        var difference =
          previewImageMagSettings["minWidth"] - previewImageOffset;
        previewImageMagSettings["minWidth"] =
          previewImageMagSettings["minWidth"] - difference;
      }
    }

    previewImageElem.find(".premium-preview-image-inner-trig-img").tooltipster({
      functionBefore: function() {
        if (
          previewImageMagSettings["hideMobiles"] &&
          $(window).outerWidth() < 768
        ) {
          return false;
        }
      },
      functionInit: function(instance, helper) {
        var content = $(helper.origin)
          .find("#tooltip_content")
          .detach();
        instance.content(content);
      },
      functionReady: function() {
        $(".tooltipster-box").addClass(
          "tooltipster-box-" + previewImageMagSettings["id"]
        );
      },
      theme: previewImageMagSettings["theme"],
      contentCloning: true,
      plugins: ["sideTip"],
      animation: previewImageMagSettings["anim"],
      animationDuration: previewImageMagSettings["animDur"],
      delay: previewImageMagSettings["delay"],
      trigger: "custom",
      triggerOpen: {
        tap: true,
        mouseenter: true
      },
      triggerClose: {
        tap: true,
        mouseleave: true
      },
      arrow: previewImageMagSettings["arrow"],
      contentAsHTML: true,
      autoClose: false,
      maxWidth: maxWidth,
      minWidth: minWidth,
      distance: previewImageMagSettings["distance"],
      interactive: previewImageMagSettings["active"],
      minIntersection: 16,
      side: previewImageMagSettings["side"]
    });
  };

  // Behance Feed Handler
  var PremiumBehanceFeedHandler = function($scope, $) {
    var premiumBehanceElem = $scope.find(".premium-behance-container"),
      loadingFeed = $scope.find(".premium-loading-feed"),
      premiumBehanceSettings = premiumBehanceElem.data("settings");

    function get_behance_data() {
      premiumBehanceElem.embedBehance({
        apiKey: premiumBehanceSettings["api_key"],
        userName: premiumBehanceSettings["username"],
        project: premiumBehanceSettings["project"],
        owners: premiumBehanceSettings["owner"],
        appreciations: premiumBehanceSettings["apprectiations"],
        views: premiumBehanceSettings["views"],
        publishedDate: premiumBehanceSettings["date"],
        fields: premiumBehanceSettings["fields"],
        projectUrl: premiumBehanceSettings["url"],
        infiniteScrolling: false,
        description: premiumBehanceSettings["desc"],
        animationEasing: "easeInOutExpo",
        ownerLink: true,
        tags: true,
        containerId: premiumBehanceSettings["id"],
        itemsPerPage: premiumBehanceSettings["number"]
      });
    }

    $.ajax({
      url: get_behance_data(),
      beforeSend: function() {
        loadingFeed.addClass("premium-show-loading");
      },
      success: function() {
        loadingFeed.removeClass("premium-show-loading");
      },
      error: function() {
        console.log("error getting data from Behance");
      }
    });
  };

  // Image Layers Handler
  var PremiumImageLayersHandler = function($scope, $) {
    var premiumImgLaysElem = $scope.find(".premium-img-layers-wrapper");

    $(premiumImgLaysElem)
      .find(".premium-img-layers-list-item")
      .each(function() {
        var _this = $(this);
        if (
          _this.data("layer-animation") &&
          " " != _this.data("layer-animation")
        ) {
          _this.css("opacity", "0");

          var waypoint = new Waypoint({
            element: $(premiumImgLaysElem),
            offset: Waypoint.viewportHeight() - 150,
            handler: function() {
              _this
                .css("opacity", "1")
                .addClass("animated " + _this.data("layer-animation"));
            }
          });
        }
      });

    premiumImgLaysElem.mousemove(function(e) {
      premiumImgLaysElem
        .find('.premium-img-layers-list-item[data-parallax="true"]')
        .each(function() {
          var $this = $(this),
            resistance = $(this).data("rate");
          //          $(this).parallax($(this).data("rate"), e);
          TweenLite.to($this, 0.2, {
            x: -((e.clientX - window.innerWidth / 2) / resistance),
            y: -((e.clientY - window.innerHeight / 2) / resistance)
          });
        });
    });

    var tilts = premiumImgLaysElem.find(
        '.premium-img-layers-list-item[data-tilt="true"]'
      ),
      liveTilt = new UniversalTilt(tilts, {
        onMouseLeave: function(el) {
          el.style.boxShadow = "0 45px 100px rgba(255, 255, 255, 0)";
        },

        onDeviceMove: function(el) {
          el.style.boxShadow = "0 45px 100px rgba(255, 255, 255, 0.3)";
        },
        mobile: false
      });
  };

  // Image Comparison Handler
  var PremiumImageCompareHandler = function($scope, $) {
    var PremiumImgCompElem = $scope.find(".premium-images-compare-container"),
      PremiumImgCompSettings = PremiumImgCompElem.data("settings");
    PremiumImgCompElem.imagesLoaded(function() {
      PremiumImgCompElem.twentytwenty({
        orientation: PremiumImgCompSettings["orientation"],
        default_offset_pct: PremiumImgCompSettings["visibleRatio"],
        switch_before_label: PremiumImgCompSettings["switchBefore"],
        before_label: PremiumImgCompSettings["beforeLabel"],
        switch_after_label: PremiumImgCompSettings["switchAfter"],
        after_label: PremiumImgCompSettings["afterLabel"],
        move_slider_on_hover: PremiumImgCompSettings["mouseMove"],
        click_to_move: PremiumImgCompSettings["clickMove"],
        show_drag: PremiumImgCompSettings["showDrag"],
        show_sep: PremiumImgCompSettings["showSep"],
        no_overlay: PremiumImgCompSettings["overlay"],
        horbeforePos: PremiumImgCompSettings["beforePos"],
        horafterPos: PremiumImgCompSettings["afterPos"],
        verbeforePos: PremiumImgCompSettings["verbeforePos"],
        verafterPos: PremiumImgCompSettings["verafterPos"]
      });
    });
  };

  // Content Switcher Handler
  var PremiumContentToggleHandler = function($scope, $) {
    var PremiumContentToggleElem = $scope.find(
      ".premium-content-toggle-container"
    );
    bouncy_filter(PremiumContentToggleElem);
    function bouncy_filter(container) {
      container.each(function() {
        var content_toggle_table = $(this);
        var filter_list_container = content_toggle_table.children(
            ".premium-content-toggle-switcher"
          ),
          filter_radios = filter_list_container.find(
            ".premium-content-toggle-button .premium-content-toggle-switch"
          ),
          content_toggle_table_wrapper = content_toggle_table.find(
            ".premium-content-toggle-two-content"
          );

        //store content toggle table items
        var table_elements = {};
        table_elements[0] = content_toggle_table_wrapper.find(
          'li[data-type="premium-content-toggle-monthly"]'
        );
        table_elements[1] = content_toggle_table_wrapper.find(
          'li[data-type="premium-content-toggle-yearly"]'
        );

        //detect input change event
        filter_radios.on("click", function(event) {
          //detect which radio input item was checked
          var selected_filter = $(event.target).val();
          if ($(this).hasClass("premium-content-toggle-switch-active")) {
            selected_filter = 0;
            $(this).toggleClass(
              "premium-content-toggle-switch-normal premium-content-toggle-switch-active"
            );
            hide_not_selected_items(table_elements, selected_filter);
          } else if ($(this).hasClass("premium-content-toggle-switch-normal")) {
            selected_filter = 1;
            $(this).toggleClass(
              "premium-content-toggle-switch-normal premium-content-toggle-switch-active"
            );
            hide_not_selected_items(table_elements, selected_filter);
          }
        });
      });
    }

    function hide_not_selected_items(table_containers, filter) {
      $.each(table_containers, function(key, value) {
        if (key != filter) {
          $(this)
            .removeClass("premium-content-toggle-is-visible")
            .addClass("premium-content-toggle-is-hidden");
        } else {
          $(this)
            .addClass("premium-content-toggle-is-visible")
            .removeClass("premium-content-toggle-is-hidden");
        }
      });
    }
  };

  // Hotspots Handler
  var PremiumImageHotspotHandler = function($scope, $) {
    var imgHotspotsElem = $scope.find(".premium-image-hotspots-container"),
      imgHotspotsSettings = imgHotspotsElem.data("settings"),
      triggerClick = null,
      triggerHover = null;

    if (imgHotspotsSettings["trigger"] === "click") {
      triggerClick = true;
      triggerHover = false;
    } else if (imgHotspotsSettings["trigger"] === "hover") {
      triggerClick = false;
      triggerHover = true;
    }
    imgHotspotsElem.find(".tooltip-wrapper").tooltipster({
      functionBefore: function() {
        if (
          imgHotspotsSettings["hideMobiles"] &&
          $(window).outerWidth() < 768
        ) {
          return false;
        }
      },
      functionInit: function(instance, helper) {
        var content = $(helper.origin)
          .find("#tooltip_content")
          .detach();
        instance.content(content);
      },
      functionReady: function() {
        $(".tooltipster-box").addClass(
          "tooltipster-box-" + imgHotspotsSettings["id"]
        );
        $(".tooltipster-arrow").addClass(
          "tooltipster-arrow-" + imgHotspotsSettings["id"]
        );
      },
      contentCloning: true,
      plugins: ["sideTip"],
      animation: imgHotspotsSettings["anim"],
      animationDuration: imgHotspotsSettings["animDur"],
      delay: imgHotspotsSettings["delay"],
      trigger: "custom",
      triggerOpen: {
        click: triggerClick,
        tap: true,
        mouseenter: triggerHover
      },
      triggerClose: {
        click: triggerClick,
        tap: true,
        mouseleave: triggerHover
      },
      arrow: imgHotspotsSettings["arrow"],
      contentAsHTML: true,
      autoClose: false,
      minWidth: imgHotspotsSettings["minWidth"],
      maxWidth: imgHotspotsSettings["maxWidth"],
      distance: imgHotspotsSettings["distance"],
      interactive: true,
      minIntersection: 16,
      side: imgHotspotsSettings["side"]
    });
  };

  // Table Handler
  var PremiumTableHandler = function($scope, $) {
    var premiumTableElem = $scope.find(".premium-table"),
      premiumTableWrap = $scope.find(".premium-table-wrap"),
      tableSettings = premiumTableElem.data("settings");
    if (tableSettings["sort"]) {
      if (
        $(window).outerWidth() > 767 ||
        ($(window).outerWidth() < 767 && tableSettings["sortMob"])
      ) {
        premiumTableElem.tablesorter({
          cssHeader: "premium-table-sort-head",
          cssAsc: "premium-table-up",
          cssDesc: "premium-table-down",
          usNumberFormat: false,
          sortReset: true,
          sortRestart: true
        });
      } else {
        premiumTableElem
          .find(".premium-table-sort-icon")
          .css("display", "none");
      }
    }
    if (tableSettings["search"]) {
      premiumTableWrap.find("#premium-table-search-field").keyup(function() {
        _this = this;
        premiumTableElem.find("tbody tr").each(function() {
          if (
            $(this)
              .text()
              .toLowerCase()
              .indexOf(
                $(_this)
                  .val()
                  .toLowerCase()
              ) === -1
          )
            $(this).hide();
          else $(this).show();
        });
      });
    }
    if (tableSettings["dataType"] == "csv") {
      $.ajax({
        url: tableSettings["csvFile"],
        type: "GET",
        dataType: "text",
        success: function(data) {
          var employee_data = data.split(/\r?\n|\r/);
          var table_data = '<thead class="premium-table-head">';
          for (var count = 0; count < employee_data.length; count++) {
            var cell_data = employee_data[count].split(",");
            table_data += '<tr class="premium-table-row">';
            for (
              var cell_count = 0;
              cell_count < cell_data.length;
              cell_count++
            ) {
              if (count === 0) {
                table_data +=
                  '<th class="premium-table-cell"><span class="premium-table-text"><span class="premium-table-inner">' +
                  cell_data[cell_count] +
                  "</span>";
                table_data += "</span></th>";
              } else {
                table_data +=
                  '<td class="premium-table-cell"><span class="premium-table-text"><span class="premium-table-inner">' +
                  cell_data[cell_count] +
                  "</span></span></td>";
              }
            }
            table_data += "</tr>";
            if (count === 0) {
              table_data += "</thead>";
            }
          }
          premiumTableElem.html("");
          premiumTableElem.html(table_data);
        },
        error: function() {
          console.log("Error While retrieving data");
        }
      });
    }
  };

  // Animated Gradient Handler
  var PremiumGradientHandler = function($scope, $) {
    var target = $scope,
      sectionId = target.data("id"),
      editMode = madxartworkFrontend.isEditMode();

    if (editMode) {
      settings = generateEditorSettings(sectionId);
    }

    if (!editMode || !settings) {
      return false;
    }

    if (settings[0] == "yes") {
      target.addClass("premium-gradient-move");
    } else {
      target.removeClass("premium-gradient-move");
    }

    generateGradient();

    function generateEditorSettings(targetId) {
      var editorElements = null,
        sectionData = {},
        sectionGradientData = {},
        sectionGradientAngle = null,
        settings = [];

      if (!window.madxartwork.hasOwnProperty("elements")) {
        return false;
      }

      editorElements = window.madxartwork.elements;

      if (!editorElements.models) {
        return false;
      }

      $.each(editorElements.models, function(index, elem) {
        if (targetId == elem.id) {
          sectionData = elem.attributes.settings.attributes;
        } else if (
          elem.id == target.closest(".madxartwork-top-section").data("id")
        ) {
          $.each(elem.attributes.elements.models, function(index, col) {
            $.each(col.attributes.elements.models, function(index, subSec) {
              sectionData = subSec.attributes.settings.attributes;
            });
          });
        }
      });

      if (!sectionData.hasOwnProperty("premium_gradient_colors_repeater")) {
        return false;
      }

      sectionGradientData =
        sectionData["premium_gradient_colors_repeater"].models;
      if (0 == sectionGradientData.length) {
        return false;
      }

      settings.push(sectionData["premium_gradient_switcher"]);
      settings.push(sectionData["premium_gradient_angle"]);
      $.each(sectionGradientData, function(index, obj) {
        settings.push(obj.attributes);
      });

      if (0 !== settings.length) {
        return settings;
      }

      return false;
    }

    function generateGradient() {
      var gradientStyle = "linear-gradient(" + settings[1] + "deg,";
      $.each(settings, function(index, layout) {
        if (null != layout["premium_gradient_colors"]) {
          gradientStyle += layout["premium_gradient_colors"] + ",";
        }
      });
      gradientStyle += ")";

      gradientStyle = gradientStyle.replace(",)", ")");

      if (target.hasClass("premium-gradient-move")) {
        target.css("background", gradientStyle);
      }
    }
  };

  // Particles Handler
  var PremiumParticlesHandler = function($scope, $) {
    var target = $scope,
      sectionId = target.data("id"),
      editMode = madxartworkFrontend.isEditMode();

    if (editMode) {
      settings = generateEditorSettings(sectionId);
    }

    if (!editMode || !settings) {
      return false;
    }

    if (settings[2] == "yes") {
      target.addClass("premium-particles-section");
      generateParticles();
    } else {
      target.removeClass("premium-particles-section");
    }

    function generateEditorSettings(targetId) {
      var editorElements = null,
        sectionData = {},
        settings = [];

      if (!window.madxartwork.hasOwnProperty("elements")) {
        return false;
      }

      editorElements = window.madxartwork.elements;

      if (!editorElements.models) {
        return false;
      }

      $.each(editorElements.models, function(index, elem) {
        if (targetId == elem.id) {
          sectionData = elem.attributes.settings.attributes;
        } else if (
          elem.id == target.closest(".madxartwork-top-section").data("id")
        ) {
          $.each(elem.attributes.elements.models, function(index, col) {
            $.each(col.attributes.elements.models, function(index, subSec) {
              sectionData = subSec.attributes.settings.attributes;
            });
          });
        }
      });

      if (!sectionData.hasOwnProperty("premium_particles_custom_style")) {
        return false;
      }

      if ("" == sectionData["premium_particles_custom_style"]) {
        return false;
      }

      settings.push(sectionData["premium_particles_zindex"]);
      settings.push(sectionData["premium_particles_custom_style"]);
      settings.push(sectionData["premium_particles_switcher"]);

      if (0 !== settings.length) {
        return settings;
      }

      return false;
    }

    function generateParticles() {
      target.attr("id", "premium-section-particles-" + sectionId);
      particlesJS(
        "premium-section-particles-" + sectionId,
        JSON.parse(settings[1])
      );
      target.children("canvas.particles-js-canvas-el").css({
        zIndex: settings[0],
        position: "absolute",
        top: 0
      });
    }
  };

  // Parallax Handler
  var PremiumParallaxHandler = function($scope, $) {
    var target = $scope,
      sectionId = target.data("id"),
      settings = false,
      editMode = madxartworkFrontend.isEditMode();

    if (editMode) {
      settings = generateEditorSettings(sectionId);
    }

    if (!editMode || !settings) {
      return false;
    }

    if (settings[0] == "yes") {
      if ("multi" != settings[1] && "automove" != settings[1]) {
        generateJarallax();
      } else if ("automove" == settings[1]) {
        generateAutoMoveBackground();
      } else {
        generateMultiLayers();
      }
    }

    function generateEditorSettings(targetId) {
      var editorElements = null,
        sectionData = {},
        sectionMultiData = {},
        settings = [];

      if (!window.madxartwork.hasOwnProperty("elements")) {
        return false;
      }

      editorElements = window.madxartwork.elements;

      if (!editorElements.models) {
        return false;
      }

      $.each(editorElements.models, function(index, elem) {
        if (targetId == elem.id) {
          sectionData = elem.attributes.settings.attributes;
        } else if (
          elem.id == target.closest(".madxartwork-top-section").data("id")
        ) {
          $.each(elem.attributes.elements.models, function(index, col) {
            $.each(col.attributes.elements.models, function(index, subSec) {
              sectionData = subSec.attributes.settings.attributes;
            });
          });
        }
      });

      if (!sectionData.hasOwnProperty("premium_parallax_type")) {
        return false;
      }

      if ("" == sectionData["premium_parallax_type"]) {
        return false;
      }

      if (
        "multi" != sectionData["premium_parallax_type"] &&
        "automove" != sectionData["premium_parallax_type"]
      ) {
        settings.push(sectionData["premium_parallax_switcher"]);
        settings.push(sectionData["premium_parallax_type"]);
        settings.push(sectionData["premium_parallax_speed"]["size"]);
        settings.push(
          "yes" == sectionData["premium_parallax_android_support"] ? 0 : 1
        );
        settings.push(
          "yes" == sectionData["premium_parallax_ios_support"] ? 0 : 1
        );
        settings.push(sectionData["premium_parallax_background_size"]);
        settings.push(sectionData["premium_parallax_background_pos"]);
      } else if ("automove" == sectionData["premium_parallax_type"]) {
        settings.push(sectionData["premium_parallax_switcher"]);
        settings.push(sectionData["premium_parallax_type"]);
        settings.push(sectionData["premium_auto_speed"]);
        settings.push(sectionData["premium_parallax_auto_type"]);
      } else {
        if (!sectionData.hasOwnProperty("premium_parallax_layers_list")) {
          return false;
        }

        sectionMultiData = sectionData["premium_parallax_layers_list"].models;

        if (0 == sectionMultiData.length) {
          return false;
        }
        settings.push(sectionData["premium_parallax_switcher"]);
        settings.push(sectionData["premium_parallax_type"]);
        settings.push(
          "yes" == sectionData["premium_parallax_layer_invert"] ? 1 : 0
        );
        $.each(sectionMultiData, function(index, obj) {
          settings.push(obj.attributes);
        });
      }

      if (0 !== settings.length) {
        return settings;
      }

      return false;
    }

    function responsiveParallax(android, ios) {
      switch (true || 1) {
        case android && ios:
          return /iPad|iPhone|iPod|Android/;
          break;
        case android && !ios:
          return /Android/;
          break;
        case !android && ios:
          return /iPad|iPhone|iPod/;
          break;
        case !android && !ios:
          return null;
      }
    }

    function generateJarallax() {
      setTimeout(function() {
        target.jarallax({
          type: settings[1],
          speed: settings[2],
          disableParallax: responsiveParallax(
            1 == settings[3],
            1 == settings[4]
          ),
          keepImg: true,
          imgSize: settings[5],
          imgPosition: settings[6]
        });
      }, 500);
    }

    function generateAutoMoveBackground() {
      var speed = parseInt(settings[2]);
      target.css("background-position", "0px 0px");
      if (settings[3] == "left") {
        var position = parseInt(target.css("background-position-x"));
        setInterval(function() {
          position = position + speed;
          target.css("backgroundPosition", position + "px 0");
        }, 70);
      } else if (settings[3] == "right") {
        var position = parseInt(target.css("background-position-x"));
        setInterval(function() {
          position = position - speed;
          target.css("backgroundPosition", position + "px 0");
        }, 70);
      } else if (settings[3] == "top") {
        var position = parseInt(target.css("background-position-y"));
        setInterval(function() {
          position = position + speed;
          target.css("backgroundPosition", "0 " + position + "px");
        }, 70);
      } else if (settings[3] == "bottom") {
        var position = parseInt(target.css("background-position-y"));
        setInterval(function() {
          position = position - speed;
          target.css("backgroundPosition", "0 " + position + "px");
        }, 70);
      }
    }

    function generateMultiLayers() {
      var counter = 0,
        mouseParallax = "",
        mouseRate = "";
      $.each(settings, function(index, layout) {
        if (2 < index) {
          if (
            null != layout["premium_parallax_layer_image"]["url"] &&
            "" != layout["premium_parallax_layer_image"]["url"]
          ) {
            if (
              "yes" == layout["premium_parallax_layer_mouse"] &&
              "" != layout["premium_parallax_layer_rate"]
            ) {
              mouseParallax = ' data-parallax="true" ';
              mouseRate =
                ' data-rate="' + layout["premium_parallax_layer_rate"] + '" ';
            } else {
              mouseParallax = ' data-parallax="false" ';
            }
            var backgroundImage = layout["premium_parallax_layer_image"]["url"],
              $html = $(
                '<div id="premium-parallax-layer-' +
                  counter +
                  '"' +
                  mouseParallax +
                  mouseRate +
                  ' class="premium-parallax-layer"></div>'
              )
                .prependTo(target)
                .css({
                  "z-index": layout["premium_parallax_layer_z_index"],
                  "background-image": "url(" + backgroundImage + ")",
                  "background-size": layout["premium_parallax_layer_back_size"],
                  "background-position-x":
                    layout["premium_parallax_layer_hor_pos"]["size"] + "%",
                  "background-position-y":
                    layout["premium_parallax_layer_ver_pos"]["size"] + "%"
                });

            counter++;
          }
        }
      });
      target.mousemove(function(e) {
        $(this)
          .find('.premium-parallax-layer[data-parallax="true"]')
          .each(function() {
            var $this = $(this),
              resistance = $(this).data("rate");
            TweenLite.to($this, 0.2, {
              x: -((e.clientX - window.innerWidth / 2) / resistance),
              y: -((e.clientY - window.innerHeight / 2) / resistance)
            });
          });
      });
    }
  };

  // Badge Handler
  var PremiumBadgeHandler = function($scope, $) {
    var target = $scope,
      columnId = target.data("id"),
      editMode = madxartworkFrontend.isEditMode();

    if (editMode) {
      settings = generateEditorSettings(columnId);
    }

    if (!editMode || !settings) {
      return false;
    }

    if (settings["premium_badge_switcher"] == "yes") {
      target.addClass("premium-soc-badge");
      generateBadgeLayout();
    } else {
      target.removeClass("premium-soc-badge");
    }

    function generateEditorSettings(targetId) {
      var editorElements = null,
        columnData = {},
        settings = {},
        columnId = [],
        settingsArr = [];

      if (!window.madxartwork.hasOwnProperty("elements")) {
        return false;
      }
      editorElements = window.madxartwork.elements;

      if (!editorElements.models) {
        return false;
      }

      $.each(editorElements.models, function(index, elem) {
        $.each(elem.attributes.elements.models, function(index, col) {
          if (col.id == targetId) {
            columnData = col.attributes.settings.attributes;
          } else {
            $.each(col.attributes.elements.models, function(index, subSec) {
              $.each(subSec.attributes.elements.models, function(
                index,
                subCol
              ) {
                columnId.push(subCol.id);

                columnData = subCol.attributes.settings.attributes;
                settingsArr[columnId] = columnData;
              });
            });
          }
        });
      });

      if (!columnData.hasOwnProperty("premium_soc_badge_type")) {
        return false;
      }

      if ("" == columnData["premium_soc_badge_type"]) {
        return false;
      }

      settings = columnData;

      if (0 !== settings.length) {
        return settings;
      }

      return false;
    }

    function generateBadgeLayout() {
      var badgeStyle = settings["premium_soc_badge_type"],
        badgePos = settings["premium_soc_badge_badge_position"],
        badgePosClass = "premium-soc-badge-" + badgePos + "-position",
        imgBadge = "",
        imgBadgeClass = "",
        badgeShape = "",
        trianglePos = "",
        imgBadge = "",
        textHtml = "";
      if ("create_your_own_style" == badgeStyle) {
        badgeShape =
          "premium-soc-badge-shape-" + settings["premium_soc_badge_shape"];
        trianglePos =
          "triangle" == settings["premium_soc_badge_shape"]
            ? "premium-soc-badge-" + badgePos + "-triangle"
            : "";
      } else {
        imgBadgeClass = "premium-soc-badge-img";
        imgBadge =
          'style="background-image:url(' +
          settings["premium_soc_badge_image"]["url"] +
          ')"';
      }

      textHtml =
        "yes" == settings["premium_soc_badge_show_text_editor"]
          ? '<div class="premium-soc-badge-text-container">' +
            settings["premium_soc_badge_text_editor"] +
            "</div>"
          : "";

      target.append(
        '<div class="premium-soc-badge-container"><div class="premium-soc-badge-body"><div class="premium-soc-badge-content-parent"><div class="premium-soc-badge-content"' +
          imgBadge +
          ">" +
          textHtml +
          "</div></div></div></div>"
      );

      target
        .find(".premium-soc-badge-body")
        .addClass(
          imgBadgeClass +
            " " +
            badgeShape +
            " " +
            trianglePos +
            " " +
            badgePosClass
        );
    }
  };

  // Reviews Handler
  var PremiumReviewHandler = function($scope, $) {
    var premiumRevElem = $scope.find(".premium-fb-rev-container"),
      revsContainer = premiumRevElem.find(".premium-fb-rev-reviews"),
      colsNumber = premiumRevElem.data("col"),
      revStyle = premiumRevElem.data("style"),
      carousel = premiumRevElem.data("carousel"),
      autoPlay = premiumRevElem.data("play"),
      speed = premiumRevElem.data("speed"),
      prevArrow =
        '<a type="button" data-role="none" class="carousel-arrow carousel-prev" aria-label="Next" role="button" style=""><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
      nextArrow =
        '<a type="button" data-role="none" class="carousel-arrow carousel-next" aria-label="Next" role="button" style=""><i class="fa fa-angle-right" aria-hidden="true"></i></a>';
        
    if (carousel) {
      $(revsContainer).slick({
        infinite: true,
        slidesToShow: colsNumber,
        slidesToScroll: colsNumber,
        responsive: [
          { breakpoint: 769, settings: { slidesToShow: 1, slidesToScroll: 1 } },
          { breakpoint: 481, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ],
        autoplay: autoPlay,
        autoplaySpeed: speed,
        nextArrow: nextArrow,
        prevArrow: prevArrow,
        draggable: true
      });
    }

    if ( "masonry" === revStyle && 1 !== colsNumber && !carousel ) {
        revsContainer.isotope({
        // options
        itemSelector: ".premium-fb-rev-review-wrap",
        percentPosition: true,
        layoutMode: "masonry",
        animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false
            }
        });
//      $(revsContainer).masonry({
//        itemSelector: ".premium-fb-rev-review-wrap",
//        percentPosition: true
//      });
    }
  };

  // Divider Handler
  var PremiumDividerHandler = function($scope, $) {
    var premiumSepElem = $scope.find(".premium-separator-container"),
      sepSettings = premiumSepElem.data("settings"),
      leftBackground = null,
      rightBackground = null;

    if ("custom" === sepSettings) {
      leftBackground = premiumSepElem
        .find(".premium-separator-left-side")
        .data("background");

      premiumSepElem
        .find(".premium-separator-left-side hr")
        .css("border-image", "url( " + leftBackground + " ) 20% round");

      rightBackground = premiumSepElem
        .find(".premium-separator-right-side")
        .data("background");

      premiumSepElem
        .find(".premium-separator-right-side hr")
        .css("border-image", "url( " + rightBackground + " ) 20% round");
    }
  };

  // Whatsapp Chat Handler
  var PremiumWhatsChatHandler = function($scope, $) {
    var premiumWhatsChat = $scope.find(".premium-whatsapp-container"),
      premiumWhatsChatSettings = premiumWhatsChat.data("settings");

    if (premiumWhatsChatSettings["hideMobile"]) {
      if ($(window).outerWidth() < premiumWhatsChatSettings["mob"]) {
        $(premiumWhatsChat).css("display", "none");
      }
    } else if (premiumWhatsChatSettings["hideTab"]) {
      if (
        $(window).outerWidth() > premiumWhatsChatSettings["mob"] &&
        $(window).outerWidth() < premiumWhatsChatSettings["tab"]
      ) {
        $(premiumWhatsChat).css("display", "none");
      }
    }

    if (premiumWhatsChatSettings["tooltips"]) {
      premiumWhatsChat.find(".premium-whatsapp-link").tooltipster({
        functionInit: function(instance, helper) {
          var content = $(helper.origin)
            .find("#tooltip_content")
            .detach();
          instance.content(content);
        },
        functionReady: function() {
          $(".tooltipster-box").addClass(
            "tooltipster-box-" + premiumWhatsChatSettings["id"]
          );
        },
        animation: premiumWhatsChatSettings["anim"],
        contentCloning: true,
        trigger: "hover",
        arrow: true,
        contentAsHTML: true,
        autoClose: false,
        minIntersection: 16,
        interactive: true,
        delay: 0,
        side: ["right", "left", "top", "bottom"]
      });
    }
  };

  // Multi Scroll Handler
  var PremiumScrollHandler = function($scope, $) {
    var premiumScrollElem = $scope.find(".premium-multiscroll-wrap"),
      premiumScrollSettings = premiumScrollElem.data("settings"),
      id = premiumScrollSettings["id"],
      winWidth = $(window).outerWidth();

    function loadMultiScroll() {
      $("#premium-scroll-nav-menu-" + id).removeClass(
        "premium-scroll-responsive"
      );
      $("#premium-multiscroll-" + id).multiscroll({
        verticalCentered: true,
        menu: "#premium-scroll-nav-menu-" + id,
        sectionsColor: [],
        keyboardScrolling: premiumScrollSettings["keyboard"],
        navigation: premiumScrollSettings["dots"],
        navigationPosition: premiumScrollSettings["dotsPos"],
        navigationVPosition: premiumScrollSettings["dotsVPos"],
        navigationTooltips: premiumScrollSettings["dotsText"],
        navigationColor: "#000",
        loopBottom: premiumScrollSettings["btmLoop"],
        loopTop: premiumScrollSettings["topLoop"],
        css3: true,
        paddingTop: 0,
        paddingBottom: 0,
        normalScrollElements: null,
        //          scrollOverflow: true,
        //          scrollOverflowOptions: null,
        touchSensitivity: 5,
        leftSelector: ".premium-multiscroll-left-" + id,
        rightSelector: ".premium-multiscroll-right-" + id,
        sectionSelector: ".premium-multiscroll-temp-" + id,
        anchors: premiumScrollSettings["anchors"],
        fit: premiumScrollSettings["fit"],
        cellHeight: premiumScrollSettings["cellHeight"],
        id: id
      });
    }
    var leftTemps = $(premiumScrollElem).find(".premium-multiscroll-left-temp"),
      rightTemps = $(premiumScrollElem).find(".premium-multiscroll-right-temp"),
      hideTabs = premiumScrollSettings["hideTabs"],
      hideMobs = premiumScrollSettings["hideMobs"],
      deviceType = $("body").data("madxartwork-device-mode");

    function hideSections(leftSec, rightSec) {
      if ("mobile" === deviceType) {
        $(leftSec).data("hide-mobs")
          ? $(leftSec).addClass("premium-multiscroll-hide")
          : "";
        $(rightSec).data("hide-mobs")
          ? $(rightSec).addClass("premium-multiscroll-hide")
          : "";
      } else {
        $(leftSec).data("hide-tabs")
          ? $(leftSec).addClass("premium-multiscroll-hide")
          : "";
        $(rightSec).data("hide-tabs")
          ? $(rightSec).addClass("premium-multiscroll-hide")
          : "";
      }
    }
    function reOrderTemplates() {
      $(premiumScrollElem)
        .parents(".madxartwork-top-section")
        .removeClass("madxartwork-section-height-full");
      $.each(rightTemps, function(index) {
        hideSections(leftTemps[index], rightTemps[index]);
        if (premiumScrollSettings["rtl"]) {
          $(leftTemps[index]).insertAfter(rightTemps[index]);
        } else {
          $(rightTemps[index]).insertAfter(leftTemps[index]);
        }
      });
      $(premiumScrollElem)
        .find(".premium-multiscroll-inner")
        .removeClass("premium-scroll-fit")
        .css("min-height", premiumScrollSettings["cellHeight"] + "px");
    }

    switch (true) {
      case hideTabs && hideMobs:
        if (deviceType === "desktop") {
          loadMultiScroll();
        } else {
          reOrderTemplates();
        }
        break;
      case hideTabs && !hideMobs:
        if (deviceType === "mobile" || deviceType === "desktop") {
          loadMultiScroll();
        } else {
          reOrderTemplates();
        }
        break;
      case !hideTabs && hideMobs:
        if (deviceType === "tablet" || deviceType === "desktop") {
          loadMultiScroll();
        } else {
          reOrderTemplates();
        }
        break;
      case !hideTabs && !hideMobs:
        loadMultiScroll();
        break;
    }
  };

  $(window).on("madxartwork/frontend/init", function() {
    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-flip-box.default",
      PremiumFlipboxHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-unfold-addon.default",
      PremiumUnfoldHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-facebook-chat.default",
      PremiumFbChatHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-twitter-feed.default",
      PremiumTwitterFeedHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-notbar.default",
      PremiumNotBarHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-chart.default",
      PremiumChartHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-instagram-feed.default",
      PremiumInstaFeedHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-facebook-feed.default",
      PremiumFacebookHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-whatsapp-chat.default",
      PremiumWhatsChatHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-tabs.default",
      PremiumTabsHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-magic-section.default",
      PremiumMagicSectionHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-preview-image.default",
      PremiumPreviewWindowHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-behance-feed.default",
      PremiumBehanceFeedHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-img-layers-addon.default",
      PremiumImageLayersHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-image-comparison.default",
      PremiumImageCompareHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-content-toggle.default",
      PremiumContentToggleHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-image-hotspots.default",
      PremiumImageHotspotHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-tables-addon.default",
      PremiumTableHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-google-reviews.default",
      PremiumReviewHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-facebook-reviews.default",
      PremiumReviewHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-divider.default",
      PremiumDividerHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/premium-multi-scroll.default",
      PremiumScrollHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/section",
      PremiumGradientHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/section",
      PremiumParticlesHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/section",
      PremiumParallaxHandler
    );

    madxartworkFrontend.hooks.addAction(
      "frontend/element_ready/column",
      PremiumBadgeHandler
    );

    if (madxartworkFrontend.isEditMode()) {
    } else {
    }
  });
})(jQuery, window.madxartworkFrontend);
