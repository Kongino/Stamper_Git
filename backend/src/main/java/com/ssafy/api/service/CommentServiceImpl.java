package com.ssafy.api.service;

import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.CommentDeletePostReq;
import com.ssafy.api.request.CommentRegisterPostReq;
import com.ssafy.api.request.CommentUpdatePostReq;
import com.ssafy.db.entity.Book;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserbookCollection;
import com.ssafy.db.repository.CommentRepository;
import com.ssafy.db.repository.UserbookCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Service("commentService")
public class CommentServiceImpl implements CommentService{
    @Autowired
    CommentRepository commentRepository;

    @Override
    public Comment registerComment(CommentRegisterPostReq commentInfo) {
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss zzz");
        Comment comment = new Comment();
        comment.setCommentDate(df.format(date));

        comment.setCommentContent(commentInfo.getCommentContent());

        comment.setBookSeq(commentInfo.getBookSeq());

        comment.setUserSeq(comment.getUserSeq());
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(CommentUpdatePostReq commentInfo) {
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss zzz");
        Comment comment = commentRepository.findByCommentSeq(commentInfo.getCommentSeq());

        comment.setCommentDate(df.format(date));
        comment.setCommentContent(commentInfo.getCommentContent());

        comment.setUserSeq(commentInfo.getUserSeq());

        return commentRepository.save(comment);
    }

    @Override
    public Comment deleteComment(CommentDeletePostReq commentInfo) {

        Comment comment = commentRepository.findByCommentSeq(commentInfo.getCommentSeq());

        commentRepository.delete(comment);
        return comment;
    }

    @Override
    public List<Comment> getCommentByBookSeq(Long bookSeq) {
        return commentRepository.findByBookSeq(bookSeq);
    }
}
