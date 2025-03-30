#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<QTimer>

/*
 *0 => init 遊戲被開啟時
 *1 => playing 遊戲遊玩時
 *2 => pause 遊戲暫停時
 *3 => timeout 時間到，遊戲結束時
 *4 => die 碰到障礙物，遊戲結束時
 */

MainWindow::MainWindow(QWidget *parent): QMainWindow(parent), ui(new Ui::MainWindow){
    ui->setupUi(this);

    game_status = 0;

    //移動物體
    bgm_pos = 0;
    object_timer = new QTimer(this);    //建立計時器
    connect(object_timer, SIGNAL(timeout()), this, SLOT(update_object()));  //連接訊號
    object_timer->start(10);    //每 10 毫秒觸發

    //更新時間
    time = 0;
    clock_timer = new QTimer(this);    //建立計時器
    connect(clock_timer, SIGNAL(timeout()), SLOT(update_time()));   //更新時間
    clock_timer->start(1000);   //每1000毫秒更新一次
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::update_time(){
    time -= 1;
    ui->lcd_clock->display(time);

    if(time == 0){
        game_status = 3;
        game_stop();
    }
}

void MainWindow::game_stop(){
    clock_timer->stop();
    object_timer->stop();
}

void MainWindow::update_object(){
    bgm_pos -= 1;   //背景位置每次往左移動

    ui->background->setGeometry(QRect(bgm_pos, 0, 4800, 512));  //設定背景位置
    if(bgm_pos == -32){
        bgm_pos = 0;
    }
}
