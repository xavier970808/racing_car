#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<QTimer>
#include<QDebug>
#include<QKeyEvent>

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
    time = 30;
    clock_timer = new QTimer(this);    //建立計時器
    connect(clock_timer, SIGNAL(timeout()), SLOT(update_time()));   //更新時間
    //clock_timer->start(1000);   //每1000毫秒更新一次
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

    if(game_status == 1){
        //playing

        car_distance += 1;    //增加移動距離
        ui->label_distance->setText("行駛距離: " + QString::number(car_distance, 'f', 0) + "公尺");   //顯示移動距離
        move_car();
    }
}

void MainWindow::move_car(){
    int car_new_pos = car_pos + car_direction;  //將接下來要移動到的位置暫存起來
    if((car_new_pos) >= 30 && (car_new_pos) <= 410){
        car_pos = car_new_pos;
        ui->car->setGeometry(QRect(10, car_pos, 237, 71));  //設定車子垂直位置
    }
    else{
        game_status = 4;
        game_stop();
    }
}

void MainWindow::on_button_start_game_clicked()
{
    game_start();
}

void MainWindow::game_start(){
    game_status = 1;    //設定playing狀態
    ui->label_title->setVisible(false);    //隱藏遊戲標題
    ui->button_start_game->setVisible(false);   //隱藏遊戲開始按鈕
    clock_timer->start(1000);   //每隔1000毫秒更新一次
    time = 30;  //重設遊戲時間
    ui->lcd_clock->display(time);   //顯示遊戲時間

    car_pos = 220;  //重設車子的垂直位置(位於中央)
    car_distance = 0;   //重設移動距離
}

void MainWindow::keyPressEvent(QKeyEvent *event){
    switch(event->key()){
    case Qt::Key_Up:
        car_direction = -1;
        qDebug() << "up";
        break;
    case Qt::Key_Down:
        car_direction = 1;
        qDebug() << "down";
        break;

    }
}

