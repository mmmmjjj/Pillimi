package com.pillimi.backend.api.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Uploader {

    private AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setAmazonS3Client() {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);

        amazonS3Client = (AmazonS3Client) AmazonS3ClientBuilder
                .standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }

    // uploadFile 이미지를 S3의 dirName 디렉토리에 저장 후 url 반환
    public String upload(File uploadFile, String dirName) {

        String fileName = dirName + "/" + uploadFile.getName();
        return putS3(uploadFile, fileName);
    }

    // uploadFile 이미지를 file Name으로 저장
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        removeNewFile(uploadFile);
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 이미지 S3 삭제
    public void delete(String currentFilePath){
        if (!"".equals(currentFilePath) && currentFilePath != null) {
            boolean isExistObject = amazonS3Client.doesObjectExist(bucket, currentFilePath);

            if (isExistObject) {
                amazonS3Client.deleteObject(bucket, currentFilePath);
            } else {
                log.debug("이미지가 없습니다.");
            }
        }
    }

    // 로컬 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            return;
        }
        log.debug("이미지 삭제를 실패했습니다.");
    }

}
