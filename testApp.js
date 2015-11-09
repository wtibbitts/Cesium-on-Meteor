CESIUM_BASE_URL = 'http://cesiumjs.org/releases/1.11/Build/Cesium/';
var testViewer, testCommon;

if (Meteor.isClient) {
  Session.set('cesiumReady', false);

  Meteor.startup(function () {
    //var testViewer;
    $.getScript('http://cesiumjs.org/releases/1.11/Build/Cesium/Cesium.js', function() {
      Session.set('cesiumReady', true);
      testViewer = Meteor.call('initializeCesium');
    }); 
    console.log("calling initialize");
    Meteor.call("initialize");
  });

  Meteor.methods({
    initializeCesium() {
      /*console.log("Starting initializeCesium with global var CESIUM_BASE_URL: "
        +CESIUM_BASE_URL);*/
      console.log(Session.get('cesiumReady'));
      console.log(Cesium);
      Cesium.BingMapsApi.defaultKey = 'NA';
  
      var osmProv = new Cesium.OpenStreetMapImageryProvider({
        url: '//a.tile.openstreetmap.org/',
      });
  
      var terrainProvider = new Cesium.CesiumTerrainProvider({
        //url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
        url : '//assets.agi.com/stk-terrain/tilesets/world/tiles',
        requestVertexNormals : true
      });
      console.log("Set variables. Building viewer.");  
      console.log(Cesium.Viewer);
      console.log(document.getElementById("cesiumContainer"));
      console.log(document.getElementById("creditContainer"));
  
      var viewer = new Cesium.Viewer(document.getElementById("cesiumContainer"), {
        timeline: false,
        animation: false,
        infoBox: false,
        navigationInstructionsInitiallyVisible: false,
        creditContainer: document.getElementById("creditContainer"),
        imageryProvider : osmProv,
        baseLayerPicker : false,
        terrainProvider : terrainProvider,
        sceneMode: Cesium.SceneMode.COLUMBUS_VIEW
      });
      console.log("Viewer built.");
      console.log(this._viewer);
      return viewer;
    },
  
    initialize() {
      // Editing cesium toolbar
      console.log(document.getElementById("cesiumContainer"));
      var toolbars = document.getElementsByClassName("cesium-viewer-toolbar");
      console.log(toolbars);
      var toolbar = toolbars[0];
      console.log(toolbar);
      var togglerBtn = document.createElement("BUTTON");
      togglerBtn.className = "cesium-button cesium-toolbar-button togglerBtn";
      togglerBtn.onclick = function() { Meteor.call('showHideElement','toggle-List'); }
      togglerBtn.style.backgroundImage = "url(/client/img/app-feature-icon-map.png)";
      togglerBtn.style.backgroundSize = "100%";
      toolbar.appendChild(togglerBtn);
    },

    showHideElement(elementID) {
      var element = document.getElementById(elementID);
      var display = element.style.display;
      if (display=='none') {
        element.style.display = 'inherit';
      }
      else {
        element.style.display = 'none';
      }
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


/*Meteor.methods({
  initializeCesium() {
    /*console.log("Starting initializeCesium with global var CESIUM_BASE_URL: "
      +CESIUM_BASE_URL);*
    console.log(Session.get('cesiumReady'));
    console.log(Cesium);
    Cesium.BingMapsApi.defaultKey = 'NA';

    var osmProv = new Cesium.OpenStreetMapImageryProvider({
      url: '//a.tile.openstreetmap.org/',
    });

    var terrainProvider = new Cesium.CesiumTerrainProvider({
      //url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
      url : '//assets.agi.com/stk-terrain/tilesets/world/tiles',
      requestVertexNormals : true
    });
    console.log("Set variables. Building viewer.");  
    console.log(Cesium.Viewer);
    console.log(document.getElementById("cesiumContainer"));
    console.log(document.getElementById("creditContainer"));

    var viewer = new Cesium.Viewer(document.getElementById("cesiumContainer"), {
      timeline: false,
      animation: false,
      infoBox: false,
      navigationInstructionsInitiallyVisible: false,
      creditContainer: document.getElementById("creditContainer"),
      imageryProvider : osmProv,
      baseLayerPicker : false,
      terrainProvider : terrainProvider,
      sceneMode: Cesium.SceneMode.COLUMBUS_VIEW
    });
    console.log("Viewer built.");
    console.log(this._viewer);
    return viewer;
  },

  initialize() {
    // Editing cesium toolbar
    console.log(document.getElementById("cesiumContainer"));
    var toolbars = document.getElementsByClassName("cesium-viewer-toolbar");
    console.log(toolbars);
    var toolbar = toolbars[0];
    console.log(toolbar);
    var togglerBtn = document.createElement("BUTTON");
    togglerBtn.className = "cesium-button cesium-toolbar-button togglerBtn";
    togglerBtn.onclick = function() { NggCommon.showHideElement('toggle-List'); }
    togglerBtn.style.backgroundImage = "url(/test/img/app-feature-icon-map.png)";
    togglerBtn.style.backgroundSize = "100%";
    toolbar.appendChild(togglerBtn);
  }
});*/