(function() {
  var canvas, context, controls = {}, texts = {};

  window.addEventListener('load', load);

  function load() {       
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.strokeStyle = 'hsl(30, 50%, 20%)';
    context.lineCap = 'round';

    Array.from(document.querySelectorAll('input[type="range"]')).forEach(input => {
      controls[input.id] = input;
      texts[input.id] = document.getElementById(input.id + 'Text');
      texts[input.id].textContent = input.value;
      input.addEventListener('input', draw);
    });

    controls.angle.min = 0;
    controls.angle.max = Math.PI / 4;
    controls.angle.step = Math.PI / 360;

    draw();
  }

  function draw(e) {
    console.log(e, this);
    if (e) {
      texts[this.id].textContent = this.value;
    }
    
    // context.save();    
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height);
    branch(controls.length.value, controls.angle.value, 1);
    context.setTransform(1, 0, 0, 1, 0, 0);
    // context.restore();
  }

  function lerp(min, max) {
    return Math.random() * (max - min) + min
  }

  function branch(length, angle, evo) {
    var growthFactor = controls.growth.value
      , lineWidth = Math.max((18 - 2 *evo) + lerp(-0.5, 0.5), 1)
      , ran;
    
    if (length <= 8 && lineWidth < 4) {
      context.strokeStyle = 'hsl(' + 120 + lerp(-20, 20) + ', 50%, ' + lerp(30, 50) + '%)';
    }
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, - length);
    context.stroke();    
    if (length > 2) {
      context.translate(0, - length);
      context.save();      
      context.rotate(angle);
      ran = lerp(1 / 2 - growthFactor / 2, 1 / 2 + growthFactor / 2);
      branch(length * ran, angle, evo + 1);
      context.restore();
      context.save();
      context.rotate(-angle);
      ran = lerp(1 / 2 - growthFactor / 2, 1 / 2 + growthFactor / 2);
      branch(length * ran, -angle, evo + 1);
      context.restore();
    }    
  }
})();