package com.karoutdoor.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class PageResponse<T> {

    private List<T> items;
    private int number;
    private int size;
    private int totalPages;
    private long totalElements;
    private boolean last;
    private boolean first;


}