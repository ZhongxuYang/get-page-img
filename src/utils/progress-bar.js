class ProgressBar {
  constructor(row) {
    this.row = row
    this.progress = 0
    this.barLength = 20
    this.speed = 0
    this.speedUnit = 'KB/s'
    this.draw()
  }

  draw() {
    const filledBarLength = Math.round(this.barLength * this.progress);
    const emptyBarLength = this.barLength - filledBarLength;

    let filledBar, emptyBar, color;
    if (this.progress >= 1) {
      filledBar = '█'.repeat(filledBarLength);
      emptyBar = '░'.repeat(emptyBarLength);
      color = '\x1b[32m'; // 绿色
    } else if (this.progress >= 0.8) {
      filledBar = '▓'.repeat(filledBarLength);
      emptyBar = '░'.repeat(emptyBarLength);
      color = '\x1b[33m'; // 黄色
    } else if (this.progress >= 0.3) {
      filledBar = '▒'.repeat(filledBarLength);
      emptyBar = '░'.repeat(emptyBarLength);
      color = '\x1b[31m'; // 红色
    } else {
      filledBar = '█'.repeat(filledBarLength);
      emptyBar = '░'.repeat(emptyBarLength);
      color = '\x1b[0m'; // 默认颜色
    }

    const bar = `${color}${filledBar}\x1b[0m\x1b[47m${emptyBar}\x1b[0m`;
    const percentageProgress = Math.round(this.progress * 100);

    process.stdout.cursorTo(0, this.row);
    process.stdout.clearLine();

    const stateStr = 
      this.progress >= 1 ? 'done' 
      : this.progress < 0 ? 'failed' 
      : this.speed + this.speedUnit
    process.stdout.write(`[${bar}] ${percentageProgress}% | file: ${this.row} | ${stateStr}`);
  }

  update(progress, speed) {
    this.progress = progress
    this.speed = speed !== Infinity ? speed : 0
    this.draw();
  }
}

// const progressBar1 = new ProgressBar(0);
// const progressBar2 = new ProgressBar(1);
// const progressBar3 = new ProgressBar(2);

// const progressBars = [progressBar1, progressBar2, progressBar3];

// const interval = setInterval(() => {
//   for (const progressBar of progressBars) {
//     progressBar.update(progressBar.progress + 0.05);
//     if (progressBar.progress >= 1) {
//       clearInterval(interval);
//       process.stdout.write('\n');
//       break;
//     }
//   }
// }, 100);

exports.ProgressBar = ProgressBar