package com.lokomotif.accelorometer.telegrambot;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.lokomotif.accelorometer.models.SummaryLoco;
import com.lokomotif.accelorometer.services.TelegramService;
import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.request.ParseMode;
import com.pengrad.telegrambot.request.SendMessage;
import com.pengrad.telegrambot.response.SendResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class TelegramBotReport {

    private static final Logger logger = LoggerFactory.getLogger(TelegramBotReport.class);

    private TelegramService telegramService;

    public TelegramBotReport(TelegramService telegramService) {
        this.telegramService = telegramService;
    }

    @Scheduled(fixedRate = 3600000)
    public void sendLatestData() {

        SummaryLoco latestData = telegramService.getLatestData();

        sendMessageToTelegramBot(latestData);
    }

    private void sendMessageToTelegramBot(SummaryLoco data) {
        TelegramBot bot = new TelegramBot("6577574077:AAF42K73S6r_FcGXP6pGsn5PswAZnHx7QGI");

        String message =  "New Data:\n" + "Date and Time: " + data.getTimestamps() + "\nTotal Locomotive: " + data.getTotalLocomotive() + "\nTotal Operated: " + data.getTotalBeroperasi() + "\nTotal Repaired: " + data.getTotalDiperbaiki() + "\nTotal Suspended: " + data.getTotalDitangguhkan();

        SendMessage request = new SendMessage(702081827, message)
            .parseMode(ParseMode.Markdown);

        SendResponse response = bot.execute(request);

        if (!response.isOk()) {
            logger.error("Pesan gagal dikirim: {}", response.description());
        }
    }
}
