using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Curriculum.BLL.BlobServices.Interfaces;
using Curriculum.Model.Users;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curriculum.BLL.BlobServices.Services
{
    public class UserBlobService : IUserBlobService
    {

        BlobContainerClient _containerClient;


        public UserBlobService(BlobServiceClient blobService)
        {
            _containerClient = blobService.GetBlobContainerClient("curriculum");
        }

      
        public string GetProfileImage(string userID)
        {
            var blobClient = GetUserBlobClient(userID);
            if (blobClient.Exists())
            {
                var uri = blobClient.GenerateSasUri(Azure.Storage.Sas.BlobSasPermissions.Read, DateTime.UtcNow.AddHours(6));
                return uri.AbsoluteUri;
            }
            return "";
        }

        public async Task SaveProfileImage(string image, string userID)
        {
            var blobClient = GetUserBlobClient(userID);
            var base64 = GetBase64(image);
            using var stream = new MemoryStream(base64, writable: false);
            await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = "image/jpg" });
        }

        public async Task DeleteProfileImage(string userID)
        {
            var blobClient = GetUserBlobClient(userID);
            await blobClient.DeleteIfExistsAsync();
        }

        private byte[] GetBase64(string @string)
        {
            var imgBase64 = "";
            if (@string.Contains("data:image/jpeg;"))
            {
                imgBase64 = @string.Replace("data:image/jpeg;base64,", "");
            }
            else
            {
                imgBase64 = @string.Replace("data:image/png;base64,", "");
            }

            byte[] bytes = Convert.FromBase64String(imgBase64);
            return bytes;
        }

        private BlobClient GetUserBlobClient(string userID)
        {
            return _containerClient.GetBlobClient($"profile_{ userID }");
        }
    }
}
