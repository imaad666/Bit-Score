package com.bitscore.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class CoinController {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String COINGECKO = "https://api.coingecko.com/api/v3";

    @GetMapping("/trending")
    public ResponseEntity<?> trending() {
        String url = COINGECKO + "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";
        Object data = restTemplate.getForObject(url, Object.class);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/coins/{id}")
    public ResponseEntity<?> coin(@PathVariable("id") String id) {
        String url = COINGECKO + "/coins/" + id + "?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false";
        Object data = restTemplate.getForObject(url, Object.class);
        return ResponseEntity.ok(data);
    }
}


