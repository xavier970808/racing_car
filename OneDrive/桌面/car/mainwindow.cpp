#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<QTimer>
#include<QDebug>
#include<QKeyEvent>
#define BLOCK01_X_POS 300
#define BLOCK01_Y_POS 40
#define BLOCK02_X_POS 2300
#define BLOCK02_Y_POS 110
#define BLOCK03_X_POS 900
#define BLOCK03_Y_POS 190
#define BLOCK04_X_POS 2800
#define BLOCK04_Y_POS 260
#define BLOCK05_X_POS 1700
#define BLOCK05_Y_POS 310
#define BLOCK06_X_POS 1500
#define BLOCK06_Y_POS 340

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

    ui->label_game_failed->setVisible(false);
    ui->label_game_timeout->setVisible(false);

    //hide blocks
    ui->block_01->setGeometry(QRect(-100, 0, 64, 64));
    ui->block_02->setGeometry(QRect(-100, 0, 64, 64));
    ui->block_03->setGeometry(QRect(-100, 0, 64, 64));
    ui->block_04->setGeometry(QRect(-100, 0, 64, 64));
    ui->block_05->setGeometry(QRect(-100, 0, 64, 64));
    ui->block_06->setGeometry(QRect(-100, 0, 64, 64));

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
    car_direction = 0;
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

    if(game_status == 3){
        //時間到，過關
        ui->label_game_timeout->setVisible(true);
    }
    else if(game_status == 4){
        //die 撞到障礙物，失敗
        ui->label_game_failed->setVisible(true);
    }
    ui->button_start_game->setVisible(true);

    ui->action_start_game->setText("開始遊戲");
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
        move_blocks();
        detect_blocks();
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
    ui->label_game_failed->setVisible(false);
    ui->label_game_timeout->setVisible(false);
    ui->label_title->setVisible(false);    //隱藏遊戲標題
    ui->button_start_game->setVisible(false);   //隱藏遊戲開始按鈕

    clock_timer->start(1000);   //每隔1000毫秒更新一次

    time = 30;  //重設遊戲時間
    ui->lcd_clock->display(time);   //顯示遊戲時間

    car_pos = 220;  //重設車子的垂直位置(位於中央)
    car_distance = 0;   //重設移動距離

    if(!object_timer->isActive()){
        //若物體移動計時器未啟動，將它啟動
        object_timer->start(10);
    }

    ui->action_start_game->setText("暫停遊戲");
}

void MainWindow::game_pause(){
    if(game_status == 1){
        game_status = 2;

        clock_timer->stop();
        object_timer->stop();
        ui->label_title->setVisible(true);
        ui->button_start_game->setText("開始遊戲");
    }
    else if(game_status == 2){
        game_status = 1;

        clock_timer->start(1000);
        object_timer->start(10);
        ui->action_start_game->setText("暫停遊戲");
        ui->label_title->setVisible(false);
    }
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
    case Qt::Key_Space:
        game_pause();
        qDebug() << "space";
        break;

    }
}

void MainWindow::move_blocks(){
    ui->block_01->setGeometry(QRect(BLOCK01_X_POS - car_distance, BLOCK01_Y_POS, 64, 64));
    ui->block_02->setGeometry(QRect(BLOCK02_X_POS - car_distance, BLOCK02_Y_POS, 64, 64));
    ui->block_03->setGeometry(QRect(BLOCK03_X_POS - car_distance, BLOCK03_Y_POS, 64, 64));
    ui->block_04->setGeometry(QRect(BLOCK04_X_POS - car_distance, BLOCK04_Y_POS, 64, 64));
    ui->block_05->setGeometry(QRect(BLOCK05_X_POS - car_distance, BLOCK05_Y_POS, 64, 64));
    ui->block_06->setGeometry(QRect(BLOCK06_X_POS - car_distance, BLOCK06_Y_POS, 64, 64));
}

void MainWindow::detect_blocks(){
    int tmp_padding_x, tmp_padding_y;   //障礙物與車子距離

    tmp_padding_x = BLOCK01_X_POS - car_distance;
    tmp_padding_y = BLOCK01_Y_POS - ui->car->y();
    if(is_collision(tmp_padding_x, tmp_padding_y)){
        return;
    }

    tmp_padding_x = BLOCK02_X_POS - car_distance;
    tmp_padding_y = BLOCK02_Y_POS - ui->car->y();
    if(is_collision(tmp_padding_x, tmp_padding_y)){
        return;
    }

    tmp_padding_x = BLOCK03_X_POS - car_distance;
    tmp_padding_y = BLOCK03_Y_POS - ui->car->y();
    if(is_collision(tmp_padding_x, tmp_padding_y)){
        return;
    }

    tmp_padding_x = BLOCK04_X_POS - car_distance;
    tmp_padding_y = BLOCK04_Y_POS - ui->car->y();
    if(is_collision(tmp_padding_x, tmp_padding_y)){
        return;
    }

    tmp_padding_x = BLOCK05_X_POS - car_distance;
    tmp_padding_y = BLOCK05_Y_POS - ui->car->y();
    if(is_collision(tmp_padding_x, tmp_padding_y)){
        return;
    }

    tmp_padding_x = BLOCK06_X_POS - car_distance;
    tmp_padding_y = BLOCK06_Y_POS - ui->car->y();
    if(is_collision(tmp_padding_x, tmp_padding_y)){
        return;
    }
}

bool MainWindow::is_collision(int x, int y){
    if((x < 247) && (x > -50)){
        if((y < 55) && (y > -55)){
            game_status = 4;
            game_stop();
            return true;
        }
    }
    return false;
}

void MainWindow::on_action_start_game_triggered()
{
    switch (game_status) {
    case 0://init
    case 3://timeout
    case 4://die
        game_start();
        break;
    case 1://playing
    case 2://pause
        game_pause();
        break;
    }
}


void MainWindow::on_action_close_game_triggered()
{
    close();
}

