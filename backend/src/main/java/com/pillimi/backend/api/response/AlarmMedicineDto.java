package com.pillimi.backend.api.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlarmMedicineDto {

    String medicineName;

    int medicineCount;
}
