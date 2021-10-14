title = "Field Goal";

description = `
      [Click]
  Kick Field goal
`;

characters = [
  `
  RRR
 lllll
 RRlRR
 RRlRR
 lllll
  RRR
  `,
  `
  ll
 l  l
  ll
  `,
  `
  RRR
 lllll
 RRRRR
 RRRRR
 lllll
  RRR
  `,
  `
  RRR
 RRRRR
 RRRRR
  RRR
  `
];

options = {
  theme: "pixel",
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 27,
};

let turf, yardline, endzoneLine, other_lines;
let goalpost_pole, goalpost_crossbar, goalpost_left, goalpost_right;
let position, aim_position, aim_right, aim_left, aim_speed;
let kicking;
let shoot_angle;
/** @type {{pos: Vector, vel: Vector}[]} */
let football;
let left_post_x, right_post_x;
let reset;
let ball;
let football_frame1, football_frame2, football_frame3, football_frame4, football_frame_counter;
let wind, wind_pixels, wind1, wind2, wind3, wind4, wind5;
let rand;

function update() {
  // init settings
  if (!ticks) {
    position = vec(49, 95);
    aim_position = vec(49, 40);
    aim_left = true;
    aim_right = false;
    aim_speed = 0.5;
    kicking = false;
    football = [];
    left_post_x = 34;
    right_post_x = left_post_x + 30;
    football_frame1 = true;
    football_frame2 = false;
    football_frame3 = false;
    football_frame4 = false;
    football_frame_counter = 0;
    wind = 0;
    wind1 = vec(50, 50);
    wind2 = vec(50, 50);
    wind3 = vec(50, 50);
    wind4 = vec(50, 50);
    wind5 = vec(50, 50);
  }

  // ground and goal post
  color("light_green");
  turf = rect(0, 78, 100, 22);
  color("black");
  yardline = rect(0, 89, 100, 1);
  color("black");
  yardline = rect(0, 83, 100, 1);
  color("black");
  endzoneLine = rect(0, 80, 100, 1);
  color("black");
  endzoneLine = rect(0, 78, 1, 3);
  color("black");
  endzoneLine = rect(99, 78, 1, 3);
  color("black");
  endzoneLine = rect(0, 78, 100, 1);
  color("black");
  other_lines = rect(left_post_x - 10, 97, 5, 1);
  color("black");
  other_lines = rect(right_post_x + 9, 97, 5, 1);
  color("black");
  other_lines = rect(left_post_x - 9, 92, 3, 1);
  color("black");
  other_lines = rect(right_post_x + 10, 92, 3, 1);
  color("black");
  other_lines = rect(left_post_x - 8, 86, 1, 1);
  color("black");
  other_lines = rect(right_post_x + 11, 86, 1, 1);
  color("yellow")
  goalpost_pole = rect(left_post_x + 15, 51, 2, 27);
  color("yellow");
  goalpost_crossbar = rect(left_post_x, 51, 32, 2);
  color("yellow");
  goalpost_left = rect(left_post_x, 16, 2, 35);
  color("yellow");
  goalpost_right = rect(right_post_x, 16, 2, 35);
  color("black");

  // wind
  if (wind != 0)
  {
    color("black");
    wind_pixels = rect(wind1.x, wind1.y, 2, 1);
    wind_pixels = rect(wind1.x + 2, wind1.y - 1, 2, 1);
    wind_pixels = rect(wind1.x + 4, wind1.y, 2, 1);
    wind_pixels = rect(wind2.x, wind2.y, 2, 1);
    wind_pixels = rect(wind2.x + 2, wind2.y - 1, 2, 1);
    wind_pixels = rect(wind2.x + 4, wind2.y, 2, 1);
    wind_pixels = rect(wind3.x, wind3.y, 2, 1);
    wind_pixels = rect(wind3.x + 2, wind3.y - 1, 2, 1);
    wind_pixels = rect(wind3.x + 4, wind3.y, 2, 1);
    wind_pixels = rect(wind4.x, wind4.y, 2, 1);
    wind_pixels = rect(wind4.x + 2, wind4.y - 1, 2, 1);
    wind_pixels = rect(wind4.x + 4, wind4.y, 2, 1);
    wind_pixels = rect(wind5.x, wind5.y, 2, 1);
    wind_pixels = rect(wind5.x + 2, wind5.y - 1, 2, 1);
    wind_pixels = rect(wind5.x + 4, wind5.y, 2, 1);
  }
  if (wind > 0 && wind != 0)
  {
    wind1.x = wind1.x + (wind * 0.1);
    wind2.x = wind2.x + (wind * 0.1);
    wind3.x = wind3.x + (wind * 0.1);
    wind4.x = wind4.x + (wind * 0.1);
    wind5.x = wind5.x + (wind * 0.1);
  }
  if (wind < 0 && wind != 0)
  {
    wind1.x = wind1.x + (wind * 0.1);
    wind2.x = wind2.x + (wind * 0.1);
    wind3.x = wind3.x + (wind * 0.1);
    wind4.x = wind4.x + (wind * 0.1);
    wind5.x = wind5.x + (wind * 0.1);
  }
  if (wind1.x > 100 && wind != 0)
  {
    wind1.x = 0;
  }
  if (wind1.x < 0 && wind != 0)
  {
    wind1.x = 100;
  }
  if (wind2.x > 100 && wind != 0)
  {
    wind2.x = 0;
  }
  if (wind2.x < 0 && wind != 0)
  {
    wind2.x = 100;
  }
  if (wind3.x > 100 && wind != 0)
  {
    wind3.x = 0;
  }
  if (wind3.x < 0 && wind != 0)
  {
    wind3.x = 100;
  }
  if (wind4.x > 100 && wind != 0)
  {
    wind4.x = 0;
  }
  if (wind4.x < 0 && wind != 0)
  {
    wind4.x = 100;
  }
  if (wind1.x > 100 && wind != 0)
  {
    wind1.x = 0;
  }
  if (wind5.x < 0 && wind != 0)
  {
    wind5.x = 100;
  }

  // football
  if (!kicking)
  {
    char("a", position);
  }

  // input/aiming
  if (!kicking)
  {
    color("black");
    char("b", aim_position);
  }
  if (aim_position.x <= 1)
  {
    aim_right = true;
    aim_left = false;
  }
  else if (aim_position.x >= 97)
  {
    aim_right = false;
    aim_left = true;
  }
  if (aim_left)
  {
    aim_position.x -= 1 * aim_speed;
  }
  if (aim_right)
  {
    aim_position.x += 1 * aim_speed;
  }

  // kicking animation
  if (input.isJustPressed && !kicking)
  {
    kicking = true;
    play("powerUp");
    shoot_angle = position.angleTo(aim_position);
    football.push({
      pos: vec(position),
      vel: vec().addWithAngle(shoot_angle, 0.75),
    });
  }
 
  remove(football, (f) => {
    f.pos.add(f.vel);
    if (wind != 0)
    {
      f.pos.x += (wind * 0.05);
    }
    
    if (football_frame1)
    {
      ball = char("a", f.pos);
    }
    else if (football_frame2)
    {
      ball = char("d", f.pos);
    }
    else if (football_frame3)
    {
      ball = char("c", f.pos);
    }
    else if (football_frame4)
    {
      ball = char("d", f.pos)
    }
    if (football_frame1 && football_frame_counter >= 15)
    {
      football_frame1 = false;
      football_frame2 = true;
      football_frame_counter = 0;
    }
    else if (football_frame2 && football_frame_counter >= 15)
    {
      football_frame2 = false;
      football_frame3 = true;
      football_frame_counter = 0;
    }
    else if (football_frame3 && football_frame_counter >= 15)
    {
      football_frame3 = false;
      football_frame4 = true;
      football_frame_counter = 0;
    }
    else if (football_frame4 && football_frame_counter >= 15)
    {
      football_frame4 = false;
      football_frame1 = true;
      football_frame_counter = 0;
    }
    football_frame_counter += 1;

    if (f.pos.y < 40)
    {
      if (f.pos.x > left_post_x && f.pos.x < right_post_x)
      {
        color("light_red");
        particle(15, 20, 100, 2, -PI / 2, 180);
        color("light_black");
        particle(15, 20, 50, 2, -PI / 2, 180);
        color("light_red");
        particle(85, 20, 100, 2, -PI / 2, 180);
        color("light_black");
        particle(85, 20, 50, 2, -PI / 2, 180);
        addScore(3, f.pos)
        play("explosion");
        reset = true;
        return f;
      }
      else
      {
        play("laser");
        end();
      }
    }
  });

  // reset game
  if (reset)
  {
    reset = false;
    position = vec(49, 95);
    aim_speed += 0.05;
    kicking = false;
    football = [];
    left_post_x = 34 + rnd(-10, 10);
    right_post_x = left_post_x + 30;
    football_frame1 = true;
    football_frame2 = false;
    football_frame3 = false;
    football_frame4 = false;
    football_frame_counter = 0;
    if (0 <= score && score < 10)
    {
      wind = rnd(0, 3);
      rand = rnd(0, 50);
      if (rand <= 25)
      {
        wind = wind * -1;
      }
    }
    else if (10 <= score && score < 20)
    {
      wind = rnd(3, 5);
      rand = rnd(0, 50);
      if (rand <= 25)
      {
        wind = wind * -1;
      }
    }
    else if (20 <= score && score < 30)
    {
      wind = rnd(5, 10);
      rand = rnd(0, 50);
      if (rand <= 25)
      {
        wind = wind * -1;
      }
    }
    else
    {
      wind = rnd(5, 12);
      rand = rnd(0, 50);
      if (rand <= 25)
      {
        wind = wind * -1;
      }
    }
    wind1 = vec(rnd(0, 100), rnd(10, 22));
    wind2 = vec(rnd(0, 100), rnd(22, 34));
    wind3 = vec(rnd(0, 100), rnd(34, 46));
    wind4 = vec(rnd(0, 100), rnd(46, 58));
    wind5 = vec(rnd(0, 100), rnd(58, 70));
  }
}