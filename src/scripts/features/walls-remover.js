"use strict";

var WallsRemover = function (walle) {
  this.walle = walle;
  this.paper = walle.paper;
};


/**
 * start
 */
WallsRemover.prototype.start = function () {

  let walle = this.walle;
  let paper = this.paper;
  let scene = walle.scene;

  this.clickHandler = (event, element) => {
    if (Wall.isWall(element) || Hole.isHole(element)) {
      this.remove(element);
    }
  };

  scene.onClick(this.clickHandler);

};

WallsRemover.prototype.remove = function (element) {
  let scene = this.walle.scene;
  let removeList = [element];

  if (Wall.isWall(element)) {
    element.attachedElements.forEach(element => removeList.push(element));

    element.edges.forEach(function (edge) {
      edge.removeAttachedElement(element);
      console.log(edge);
      if (edge.attachedElements.size === 0) {
        removeList.push(edge);
      }
    });
  }

  scene.removeElements(removeList);
  removeList.forEach(element=> element.remove());

};

/**
 * stop
 */
WallsRemover.prototype.stop = function () {
  this.paper.unclick(this.clickHandler);
};
