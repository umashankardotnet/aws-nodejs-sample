/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

// Load the SDK and UUID
var { S3Client, CreateBucketCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
var uuid = require('node-uuid');

// Create an S3 client
var s3 = new S3Client({});

// Create a bucket and upload something into it
var bucketName = 'node-sdk-sample-' + uuid.v4();
var keyName = 'hello_world.txt';

s3.send(new CreateBucketCommand({Bucket: bucketName}))
  .then(function() {
    var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    return s3.send(new PutObjectCommand(params))
      .then(function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      })
      .catch(function(err) {
        console.log(err)
      });
  })
  .catch(function(err) {
    console.log(err)
  });
