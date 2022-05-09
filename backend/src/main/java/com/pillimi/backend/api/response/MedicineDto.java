package com.pillimi.backend.api.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MedicineDto {

    String medicineName;

    int medicineCount;
}
