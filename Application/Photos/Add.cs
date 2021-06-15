﻿using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; } 
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _dataContext;
            private readonly IPhotoAcccessor _photoAcccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IPhotoAcccessor photoAcccessor, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _photoAcccessor = photoAcccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = await _photoAcccessor.AddPhoto(request.File);
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;
                user.Photos.Add(photo);
                var result = await _dataContext.SaveChangesAsync() > 0;
                if (result) return Result<Photo>.Success(photo);
                return Result<Photo>.Failure("Problem adding Image");
            }
        }
    }
}
