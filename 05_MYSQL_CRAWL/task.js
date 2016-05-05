var cronTab = require('cron').CronJob;          //任务管理器
var child_process = require('child_process');   //子进程

//秒 分 时 日 月 周
var task = new cronTab("0 0 0-23 * * *",function(){     //每个整点的时候抓取一次
    var task = child_process.spawn(process.execPath,['main.js']);
    task.stdout.pipe(process.stdout);
    task.stderr.pipe(process.stderr);
});
task.start();